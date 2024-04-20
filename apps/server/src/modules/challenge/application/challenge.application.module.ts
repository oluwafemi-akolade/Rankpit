import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ChallengeDomainModule } from '../domain'
import { ChallengeController } from './challenge.controller'

import { TeamDomainModule } from '../../../modules/team/domain'

import { ChallengeByTeamController } from './challengeByTeam.controller'

import { GameDomainModule } from '../../../modules/game/domain'

import { ChallengeByGameController } from './challengeByGame.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ChallengeDomainModule,

    TeamDomainModule,

    GameDomainModule,
  ],
  controllers: [
    ChallengeController,

    ChallengeByTeamController,

    ChallengeByGameController,
  ],
  providers: [],
})
export class ChallengeApplicationModule {}
