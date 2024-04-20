import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MatchDomainModule } from '../domain'
import { MatchController } from './match.controller'

import { TournamentDomainModule } from '../../../modules/tournament/domain'

import { MatchByTournamentController } from './matchByTournament.controller'

import { TeamDomainModule } from '../../../modules/team/domain'

import { MatchByTeamController } from './matchByTeam.controller'

import { ChallengeDomainModule } from '../../../modules/challenge/domain'

import { MatchByChallengeController } from './matchByChallenge.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MatchDomainModule,

    TournamentDomainModule,

    TeamDomainModule,

    ChallengeDomainModule,
  ],
  controllers: [
    MatchController,

    MatchByTournamentController,

    MatchByTeamController,

    MatchByChallengeController,
  ],
  providers: [],
})
export class MatchApplicationModule {}
