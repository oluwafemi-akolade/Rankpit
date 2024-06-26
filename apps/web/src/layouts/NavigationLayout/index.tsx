import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/games',
      label: 'Select Game',
      onClick: () => goTo('/games'),
    },

    {
      key: '/players',
      label: 'Find Players',
      onClick: () => goTo('/players'),
    },

    {
      key: '/team',
      label: 'Manage Team',
      onClick: () => goTo('/team'),
    },

    {
      key: '/messages',
      label: 'Messages',
      onClick: () => goTo('/messages'),
    },

    {
      key: '/articles',
      label: 'Read Articles',
      onClick: () => goTo('/articles'),
    },

    {
      key: '/tournaments/create',
      label: 'Create Tournament',
      onClick: () => goTo('/tournaments/create'),
    },

    {
      key: '/tournaments/join',
      label: 'Join Tournament',
      onClick: () => goTo('/tournaments/join'),
    },

    {
      key: '/leagues',
      label: 'Leagues',
      onClick: () => goTo('/leagues'),
    },

    {
      key: '/matches/results',
      label: 'Enter Match Results',
      onClick: () => goTo('/matches/results'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Home',
    },

    {
      key: '/games',
      label: 'Select Game',
    },

    {
      key: '/players',
      label: 'Find Players',
    },

    {
      key: '/team',
      label: 'Manage Team',
    },

    {
      key: '/messages',
      label: 'Messages',
    },

    {
      key: '/articles',
      label: 'Read Articles',
    },

    {
      key: '/tournaments/create',
      label: 'Create Tournament',
    },

    {
      key: '/tournaments/join',
      label: 'Join Tournament',
    },

    {
      key: '/leagues',
      label: 'Leagues',
    },

    {
      key: '/matches/results',
      label: 'Enter Match Results',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
