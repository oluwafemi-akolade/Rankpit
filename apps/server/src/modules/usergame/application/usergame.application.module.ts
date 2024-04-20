import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UsergameDomainModule } from '../domain'
import { UsergameController } from './usergame.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UsergameByUserController } from './usergameByUser.controller'

import { GameDomainModule } from '../../../modules/game/domain'

import { UsergameByGameController } from './usergameByGame.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UsergameDomainModule,

    UserDomainModule,

    GameDomainModule,
  ],
  controllers: [
    UsergameController,

    UsergameByUserController,

    UsergameByGameController,
  ],
  providers: [],
})
export class UsergameApplicationModule {}
