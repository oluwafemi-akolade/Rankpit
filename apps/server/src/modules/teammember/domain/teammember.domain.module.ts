import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TeammemberDomainFacade } from './teammember.domain.facade'
import { Teammember } from './teammember.model'

@Module({
  imports: [TypeOrmModule.forFeature([Teammember]), DatabaseHelperModule],
  providers: [TeammemberDomainFacade, TeammemberDomainFacade],
  exports: [TeammemberDomainFacade],
})
export class TeammemberDomainModule {}
