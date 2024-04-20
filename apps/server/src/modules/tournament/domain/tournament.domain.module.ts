import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TournamentDomainFacade } from './tournament.domain.facade'
import { Tournament } from './tournament.model'

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), DatabaseHelperModule],
  providers: [TournamentDomainFacade, TournamentDomainFacade],
  exports: [TournamentDomainFacade],
})
export class TournamentDomainModule {}
