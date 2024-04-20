'use client'

import { useState, useEffect } from 'react'
import { Input, Button, Card, Avatar, Row, Col, Typography, Space } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PlayerSearchPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      enqueueSnackbar('You must be logged in to access this page', {
        variant: 'error',
      })
      router.push('/home')
    }
  }, [authentication.isAuthenticated, router])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const usersFound = await Api.User.findMany({
        filters: { name: { ilike: `%${search}%` } },
        includes: ['usergames', 'usergames.game'],
      })
      setUsers(usersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch users', { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Player Search</Title>
      <Text type="secondary">
        Search for players by name or game to network and form teams.
      </Text>
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: 20 }}
      >
        <Input
          placeholder="Search by player name"
          prefix={<UserOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          suffix={
            <Button
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
            >
              Search
            </Button>
          }
        />
        <Row gutter={[16, 16]}>
          {users?.map(user => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => router.push(`/players/${user.id}`)}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src={user.pictureUrl || undefined}
                      icon={<UserOutlined />}
                    />
                  }
                  title={user.name}
                  description={`Joined: ${dayjs(user.dateCreated).format('DD MMM YYYY')}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
