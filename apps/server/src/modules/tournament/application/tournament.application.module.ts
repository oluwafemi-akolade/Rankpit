import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TournamentDomainModule } from '../domain'
import { TournamentController } from './tournament.controller'

import { GameDomainModule } from '../../../modules/game/domain'

import { TournamentByGameController } from './tournamentByGame.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TournamentByUserController } from './tournamentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TournamentDomainModule,

    GameDomainModule,

    UserDomainModule,
  ],
  controllers: [
    TournamentController,

    TournamentByGameController,

    TournamentByUserController,
  ],
  providers: [],
})
export class TournamentApplicationModule {}
