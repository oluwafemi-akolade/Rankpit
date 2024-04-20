import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ProfileDomainModule } from './profile/domain'

import { GameDomainModule } from './game/domain'

import { UsergameDomainModule } from './usergame/domain'

import { TeamDomainModule } from './team/domain'

import { TeammemberDomainModule } from './teammember/domain'

import { MessageDomainModule } from './message/domain'

import { ArticleDomainModule } from './article/domain'

import { TournamentDomainModule } from './tournament/domain'

import { ChallengeDomainModule } from './challenge/domain'

import { MatchDomainModule } from './match/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ProfileDomainModule,

    GameDomainModule,

    UsergameDomainModule,

    TeamDomainModule,

    TeammemberDomainModule,

    MessageDomainModule,

    ArticleDomainModule,

    TournamentDomainModule,

    ChallengeDomainModule,

    MatchDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
