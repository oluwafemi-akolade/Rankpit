import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TeamDomainModule } from '../domain'
import { TeamController } from './team.controller'

@Module({
  imports: [AuthenticationDomainModule, TeamDomainModule],
  controllers: [TeamController],
  providers: [],
})
export class TeamApplicationModule {}
