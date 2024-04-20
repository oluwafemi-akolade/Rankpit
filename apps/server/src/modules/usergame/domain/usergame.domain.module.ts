import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UsergameDomainFacade } from './usergame.domain.facade'
import { Usergame } from './usergame.model'

@Module({
  imports: [TypeOrmModule.forFeature([Usergame]), DatabaseHelperModule],
  providers: [UsergameDomainFacade, UsergameDomainFacade],
  exports: [UsergameDomainFacade],
})
export class UsergameDomainModule {}
