import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ProfileApplicationModule } from './profile/application'

import { GameApplicationModule } from './game/application'

import { UsergameApplicationModule } from './usergame/application'

import { TeamApplicationModule } from './team/application'

import { TeammemberApplicationModule } from './teammember/application'

import { MessageApplicationModule } from './message/application'

import { ArticleApplicationModule } from './article/application'

import { TournamentApplicationModule } from './tournament/application'

import { ChallengeApplicationModule } from './challenge/application'

import { MatchApplicationModule } from './match/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ProfileApplicationModule,

    GameApplicationModule,

    UsergameApplicationModule,

    TeamApplicationModule,

    TeammemberApplicationModule,

    MessageApplicationModule,

    ArticleApplicationModule,

    TournamentApplicationModule,

    ChallengeApplicationModule,

    MatchApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
