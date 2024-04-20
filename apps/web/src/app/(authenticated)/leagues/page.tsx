'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space, Spin } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function LeaguePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [tournaments, setTournaments] = useState<Model.Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournamentsFound = await Api.Tournament.findMany({
          includes: ['game', 'organizer'],
        })
        setTournaments(tournamentsFound)
      } catch (error) {
        enqueueSnackbar('Failed to load tournaments', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  const handleJoinTournament = async (tournamentId: string) => {
    try {
      await Api.Tournament.updateOne(tournamentId, { status: 'Joined' })
      enqueueSnackbar('Successfully joined the tournament!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to join the tournament', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Esports Leagues</Title>
      <Text>Join and compete in various esports leagues.</Text>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          tournaments?.map(tournament => (
            <Col key={tournament.id} span={24} md={12} lg={8}>
              <Card
                title={tournament.name}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleJoinTournament(tournament.id)}
                    icon={<TrophyOutlined />}
                  >
                    Join League
                  </Button>,
                ]}
              >
                <p>
                  <strong>Game:</strong> {tournament.game?.name}
                </p>
                <p>
                  <strong>Organizer:</strong> {tournament.organizer?.name}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {dayjs(tournament.dateCreated).format('DD/MM/YYYY')}
                </p>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </PageLayout>
  )
}
