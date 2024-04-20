import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GameDomainModule } from '../domain'
import { GameController } from './game.controller'

@Module({
  imports: [AuthenticationDomainModule, GameDomainModule],
  controllers: [GameController],
  providers: [],
})
export class GameApplicationModule {}
