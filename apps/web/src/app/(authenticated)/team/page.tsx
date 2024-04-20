'use client'

import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Form, Input, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TeamManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [teams, setTeams] = useState<Model.Team[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<Model.Team | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsFound = await Api.Team.findMany({
          includes: ['teammembers', 'teammembers.user'],
        })
        setTeams(teamsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch teams', { variant: 'error' })
      }
    }

    fetchTeams()
  }, [])

  const showModal = (team: Model.Team | null) => {
    setCurrentTeam(team)
    form.setFieldsValue(team ? team : { name: '', description: '' })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setCurrentTeam(null)
  }

  const handleFormSubmit = async (values: {
    name: string
    description: string
  }) => {
    try {
      if (currentTeam) {
        await Api.Team.updateOne(currentTeam.id, values)
        enqueueSnackbar('Team updated successfully', { variant: 'success' })
      } else {
        await Api.Team.createOne(values)
        enqueueSnackbar('Team created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      setCurrentTeam(null)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to submit team data', { variant: 'error' })
    }
  }

  const handleDelete = async (teamId: string) => {
    try {
      await Api.Team.deleteOne(teamId)
      enqueueSnackbar('Team deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete team', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Model.Team) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Team Management</Title>
      <Text>Manage your esports teams and members.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal(null)}
        style={{ marginBottom: 16 }}
      >
        Add Team
      </Button>
      <Table dataSource={teams} columns={columns} rowKey="id" />
      <Modal
        title={`${currentTeam ? 'Edit' : 'Add'} Team`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the team name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}
