'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Avatar, Space } from 'antd'
import {
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  TrophyOutlined,
  ReadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['profiles', 'usergames', 'teammembers', 'articlesAsAuthor'],
      })
        .then(setUser)
        .catch(() =>
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' }),
        )
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Welcome to Rankpit</Title>
      <Text>
        Welcome to your dashboard, where you can manage everything in one place.
      </Text>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card onClick={() => router.push('/games')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<UserOutlined />} />
              <Text>Games</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => router.push('/team')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<TeamOutlined />} />
              <Text>Team Management</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => router.push('/messages')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<MessageOutlined />} />
              <Text>Messages</Text>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card onClick={() => router.push('/tournaments/create')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<TrophyOutlined />} />
              <Text>Create Tournament</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => router.push('/articles')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<ReadOutlined />} />
              <Text>Articles</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => router.push('/tournaments/join')} hoverable>
            <Space direction="vertical" align="center">
              <Avatar size={64} icon={<TrophyOutlined />} />
              <Text>Join Tournament</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
