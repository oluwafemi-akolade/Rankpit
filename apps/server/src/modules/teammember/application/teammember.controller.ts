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
import {
  Teammember,
  TeammemberDomainFacade,
} from '@server/modules/teammember/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TeammemberApplicationEvent } from './teammember.application.event'
import { TeammemberCreateDto, TeammemberUpdateDto } from './teammember.dto'

@Controller('/v1/teammembers')
export class TeammemberController {
  constructor(
    private eventService: EventService,
    private teammemberDomainFacade: TeammemberDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.teammemberDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TeammemberCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.teammemberDomainFacade.create(body)

    await this.eventService.emit<TeammemberApplicationEvent.TeammemberCreated.Payload>(
      TeammemberApplicationEvent.TeammemberCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:teammemberId')
  async findOne(
    @Param('teammemberId') teammemberId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.teammemberDomainFacade.findOneByIdOrFail(
      teammemberId,
      queryOptions,
    )

    return item
  }

  @Patch('/:teammemberId')
  async update(
    @Param('teammemberId') teammemberId: string,
    @Body() body: TeammemberUpdateDto,
  ) {
    const item =
      await this.teammemberDomainFacade.findOneByIdOrFail(teammemberId)

    const itemUpdated = await this.teammemberDomainFacade.update(
      item,
      body as Partial<Teammember>,
    )
    return itemUpdated
  }

  @Delete('/:teammemberId')
  async delete(@Param('teammemberId') teammemberId: string) {
    const item =
      await this.teammemberDomainFacade.findOneByIdOrFail(teammemberId)

    await this.teammemberDomainFacade.delete(item)

    return item
  }
}
