import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TeammemberDomainModule } from '../domain'
import { TeammemberController } from './teammember.controller'

import { TeamDomainModule } from '../../../modules/team/domain'

import { TeammemberByTeamController } from './teammemberByTeam.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TeammemberByUserController } from './teammemberByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TeammemberDomainModule,

    TeamDomainModule,

    UserDomainModule,
  ],
  controllers: [
    TeammemberController,

    TeammemberByTeamController,

    TeammemberByUserController,
  ],
  providers: [],
})
export class TeammemberApplicationModule {}
