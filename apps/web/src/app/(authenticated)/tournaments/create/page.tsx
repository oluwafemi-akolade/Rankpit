'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TournamentCreationPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [games, setGames] = useState<Model.Game[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesFound = await Api.Game.findMany()
        setGames(gamesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch games', { variant: 'error' })
      }
    }

    fetchGames()
  }, [])

  const handleFormSubmit = async (values: any) => {
    try {
      const { name, status, gameId } = values
      const organizerId = authentication.user?.id

      if (!organizerId) {
        enqueueSnackbar('You must be logged in to create a tournament', {
          variant: 'error',
        })
        return
      }

      const newTournament = await Api.Tournament.createOneByGameId(gameId, {
        name,
        status,
        organizerId,
      })

      enqueueSnackbar(
        `Tournament "${newTournament.name}" created successfully!`,
        { variant: 'success' },
      )
      router.push('/tournaments/join')
    } catch (error) {
      enqueueSnackbar('Failed to create tournament', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create a New Tournament</Title>
      <Text type="secondary">
        Start a new gaming tournament by filling out the details below.
      </Text>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="name"
          label="Tournament Name"
          rules={[
            { required: true, message: 'Please input the tournament name!' },
          ]}
        >
          <Input placeholder="Enter tournament name" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            { required: true, message: 'Please select the tournament status!' },
          ]}
        >
          <Select placeholder="Select a status">
            <Option value="upcoming">Upcoming</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="gameId"
          label="Game"
          rules={[{ required: true, message: 'Please select a game!' }]}
        >
          <Select
            placeholder="Select a game"
            showSearch
            optionFilterProp="children"
          >
            {games.map(game => (
              <Option key={game.id} value={game.id}>
                {game.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Create Tournament
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
