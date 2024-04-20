'use client'

import { Button, Form, Input, Typography } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MatchResultsEntryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: { matchId: string; result: string }) => {
    try {
      const updatedMatch = await Api.Match.updateOne(values.matchId, {
        result: values.result,
      })
      enqueueSnackbar('Match result updated successfully!', {
        variant: 'success',
      })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to update match result.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <TrophyOutlined /> Enter Match Results
      </Title>
      <Text>Please enter the result of the match.</Text>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="matchId"
          label="Match ID"
          rules={[{ required: true, message: 'Match ID is required' }]}
        >
          <Input placeholder="Enter Match ID" />
        </Form.Item>
        <Form.Item
          name="result"
          label="Result"
          rules={[{ required: true, message: 'Result is required' }]}
        >
          <Input placeholder="Enter the result of the match" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Result
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
