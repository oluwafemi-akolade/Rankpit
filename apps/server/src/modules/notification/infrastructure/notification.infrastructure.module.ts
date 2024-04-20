import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationProfileSubscriber } from './subscribers/notification.profile.subscriber'

import { NotificationGameSubscriber } from './subscribers/notification.game.subscriber'

import { NotificationUsergameSubscriber } from './subscribers/notification.usergame.subscriber'

import { NotificationTeamSubscriber } from './subscribers/notification.team.subscriber'

import { NotificationTeammemberSubscriber } from './subscribers/notification.teammember.subscriber'

import { NotificationMessageSubscriber } from './subscribers/notification.message.subscriber'

import { NotificationArticleSubscriber } from './subscribers/notification.article.subscriber'

import { NotificationTournamentSubscriber } from './subscribers/notification.tournament.subscriber'

import { NotificationChallengeSubscriber } from './subscribers/notification.challenge.subscriber'

import { NotificationMatchSubscriber } from './subscribers/notification.match.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationProfileSubscriber,

    NotificationGameSubscriber,

    NotificationUsergameSubscriber,

    NotificationTeamSubscriber,

    NotificationTeammemberSubscriber,

    NotificationMessageSubscriber,

    NotificationArticleSubscriber,

    NotificationTournamentSubscriber,

    NotificationChallengeSubscriber,

    NotificationMatchSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
