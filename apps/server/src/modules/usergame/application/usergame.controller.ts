import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Usergame, UsergameDomainFacade } from '@server/modules/usergame/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UsergameApplicationEvent } from './usergame.application.event'
import { UsergameCreateDto, UsergameUpdateDto } from './usergame.dto'

@Controller('/v1/usergames')
export class UsergameController {
  constructor(
    private eventService: EventService,
    private usergameDomainFacade: UsergameDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.usergameDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UsergameCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.usergameDomainFacade.create(body)

    await this.eventService.emit<UsergameApplicationEvent.UsergameCreated.Payload>(
      UsergameApplicationEvent.UsergameCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:usergameId')
  async findOne(
    @Param('usergameId') usergameId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.usergameDomainFacade.findOneByIdOrFail(
      usergameId,
      queryOptions,
    )

    return item
  }

  @Patch('/:usergameId')
  async update(
    @Param('usergameId') usergameId: string,
    @Body() body: UsergameUpdateDto,
  ) {
    const item = await this.usergameDomainFacade.findOneByIdOrFail(usergameId)

    const itemUpdated = await this.usergameDomainFacade.update(
      item,
      body as Partial<Usergame>,
    )
    return itemUpdated
  }

  @Delete('/:usergameId')
  async delete(@Param('usergameId') usergameId: string) {
    const item = await this.usergameDomainFacade.findOneByIdOrFail(usergameId)

    await this.usergameDomainFacade.delete(item)

    return item
  }
}
