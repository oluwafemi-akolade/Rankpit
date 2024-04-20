import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TeammemberDomainFacade } from '@server/modules/teammember/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TeammemberApplicationEvent } from './teammember.application.event'
import { TeammemberCreateDto } from './teammember.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TeammemberByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private teammemberDomainFacade: TeammemberDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/teammembers')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.teammemberDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/teammembers')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: TeammemberCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.teammemberDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TeammemberApplicationEvent.TeammemberCreated.Payload>(
      TeammemberApplicationEvent.TeammemberCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
