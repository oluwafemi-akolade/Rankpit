import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MessageDomainModule } from '../domain'
import { MessageController } from './message.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { MessageByUserController } from './messageByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, MessageDomainModule, UserDomainModule],
  controllers: [MessageController, MessageByUserController],
  providers: [],
})
export class MessageApplicationModule {}
