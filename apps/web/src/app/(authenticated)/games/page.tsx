'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Button, Space } from 'antd'
import { PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
interface Game extends Model.Game {}
interface Tournament extends Model.Tournament {}
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GameSelectionPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesFound = await Api.Game.findMany({
          includes: ['tournaments'],
        })
        setGames(gamesFound)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch games', { variant: 'error' })
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handleJoinTournament = (tournamentId: string) => {
    router.push(`/tournaments/join?tournamentId=${tournamentId}`)
  }

  const handleViewTournaments = (gameId: string) => {
    router.push(`/tournaments?gameId=${gameId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Select a Game</Title>
      <Text type="secondary">
        Choose a game to view tournaments or join a game.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {games?.map(game => (
          <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={game.name}
              actions={[
                <Button
                  icon={<PlayCircleOutlined />}
                  onClick={() => handleViewTournaments(game.id)}
                >
                  View Tournaments
                </Button>,
                game.tournaments?.map(tournament => (
                  <Button
                    key={tournament.id}
                    icon={<TrophyOutlined />}
                    onClick={() => handleJoinTournament(tournament.id)}
                  >
                    Join {tournament.name}
                  </Button>
                )),
              ]}
            >
              <Text>Genre: {game.genre}</Text>
              <br />
              <Text type="secondary">
                Created on: {dayjs(game.dateCreated).format('DD MMM YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
