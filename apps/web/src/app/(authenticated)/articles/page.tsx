'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Space } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ArticlesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesFound = await Api.Article.findMany({
          includes: ['author'],
        })
        setArticles(articlesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch articles', { variant: 'error' })
      }
    }

    fetchArticles()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Esports & Gaming Articles</Title>
      <Paragraph>
        Dive into the latest news, strategies, and updates in the world of
        esports and gaming.
      </Paragraph>
      <Row gutter={[16, 16]}>
        {articles?.map(article => (
          <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() =>
                enqueueSnackbar('Article clicked!', { variant: 'info' })
              }
              cover={
                <Avatar
                  size={64}
                  icon={<ReadOutlined />}
                  style={{ backgroundColor: '#f56a00', margin: '10px auto' }}
                />
              }
            >
              <Card.Meta
                title={article.title}
                description={
                  <Space direction="vertical">
                    <Text>{article.author?.name}</Text>
                    <Text type="secondary">{article.dateCreated}</Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
