import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TeamDomainFacade } from './team.domain.facade'
import { Team } from './team.model'

@Module({
  imports: [TypeOrmModule.forFeature([Team]), DatabaseHelperModule],
  providers: [TeamDomainFacade, TeamDomainFacade],
  exports: [TeamDomainFacade],
})
export class TeamDomainModule {}
