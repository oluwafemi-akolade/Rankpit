'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Button, Card, Avatar } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TournamentJoiningPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await Api.Tournament.findMany({
          includes: ['game', 'organizer'],
        })
        setTournaments(data)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tournaments', { variant: 'error' })
      }
    }

    fetchTournaments()
  }, [])

  const joinTournament = async tournamentId => {
    try {
      await Api.Tournament.updateOne(tournamentId, { userId })
      enqueueSnackbar('Successfully joined the tournament', {
        variant: 'success',
      })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to join the tournament', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Join a Tournament</Title>
      <Text>
        Choose a tournament from the list below and join the competition!
      </Text>
      <List
        itemLayout="horizontal"
        dataSource={tournaments}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => joinTournament(item.id)}>
                Join
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.organizer?.pictureUrl}
                  icon={<TrophyOutlined />}
                />
              }
              title={item.name}
              description={`Organized by ${item.organizer?.name}`}
            />
            <div>
              <Text strong>Game: </Text>
              {item.game?.name}
            </div>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
