import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GameDomainFacade } from './game.domain.facade'
import { Game } from './game.model'

@Module({
  imports: [TypeOrmModule.forFeature([Game]), DatabaseHelperModule],
  providers: [GameDomainFacade, GameDomainFacade],
  exports: [GameDomainFacade],
})
export class GameDomainModule {}
