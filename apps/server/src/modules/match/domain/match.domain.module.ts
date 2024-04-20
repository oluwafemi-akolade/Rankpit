import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MatchDomainFacade } from './match.domain.facade'
import { Match } from './match.model'

@Module({
  imports: [TypeOrmModule.forFeature([Match]), DatabaseHelperModule],
  providers: [MatchDomainFacade, MatchDomainFacade],
  exports: [MatchDomainFacade],
})
export class MatchDomainModule {}
