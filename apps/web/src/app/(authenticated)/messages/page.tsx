'use client'

import React, { useEffect, useState } from 'react'
import { Input, Button, List, Avatar, Typography, Row, Col } from 'antd'
import { UserOutlined, SendOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MessagingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to view messages', {
        variant: 'error',
      })
      router.push('/home')
      return
    }
    fetchMessages()
  }, [userId])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const receivedMessages = await Api.Message.findManyByReceiverId(userId, {
        includes: ['sender'],
      })
      const sentMessages = await Api.Message.findManyBySenderId(userId, {
        includes: ['receiver'],
      })
      setMessages(
        [...receivedMessages, ...sentMessages].sort((a, b) =>
          dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? 1 : -1,
        ),
      )
    } catch (error) {
      enqueueSnackbar('Failed to fetch messages', { variant: 'error' })
    }
    setLoading(false)
  }

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      enqueueSnackbar('Message cannot be empty', { variant: 'error' })
      return
    }
    try {
      await Api.Message.createOneBySenderId(userId, {
        content: messageContent,
        receiverId: 'receiver-user-id',
      })
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
      setMessageContent('')
      fetchMessages()
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Messaging</Title>
      <Text type="secondary">
        Private messaging with your friends or team members.
      </Text>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <Input
            placeholder="Type your message here..."
            value={messageContent}
            onChange={e => setMessageContent(e.target.value)}
            suffix={
              <Button
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!messageContent.trim()}
              >
                Send
              </Button>
            }
          />
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar icon={<UserOutlined />} src={item.sender?.pictureUrl} />
              }
              title={item.sender?.name || 'Unknown User'}
              description={item.content}
            />
            <div>{dayjs(item.dateCreated).format('DD/MM/YYYY HH:mm')}</div>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
