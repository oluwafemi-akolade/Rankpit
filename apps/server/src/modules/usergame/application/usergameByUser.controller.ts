import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UsergameDomainFacade } from '@server/modules/usergame/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UsergameApplicationEvent } from './usergame.application.event'
import { UsergameCreateDto } from './usergame.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UsergameByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private usergameDomainFacade: UsergameDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/usergames')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.usergameDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/usergames')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UsergameCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.usergameDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UsergameApplicationEvent.UsergameCreated.Payload>(
      UsergameApplicationEvent.UsergameCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
