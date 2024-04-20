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
import { Match, MatchDomainFacade } from '@server/modules/match/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MatchApplicationEvent } from './match.application.event'
import { MatchCreateDto, MatchUpdateDto } from './match.dto'

@Controller('/v1/matchs')
export class MatchController {
  constructor(
    private eventService: EventService,
    private matchDomainFacade: MatchDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.matchDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MatchCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.matchDomainFacade.create(body)

    await this.eventService.emit<MatchApplicationEvent.MatchCreated.Payload>(
      MatchApplicationEvent.MatchCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:matchId')
  async findOne(@Param('matchId') matchId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.matchDomainFacade.findOneByIdOrFail(
      matchId,
      queryOptions,
    )

    return item
  }

  @Patch('/:matchId')
  async update(
    @Param('matchId') matchId: string,
    @Body() body: MatchUpdateDto,
  ) {
    const item = await this.matchDomainFacade.findOneByIdOrFail(matchId)

    const itemUpdated = await this.matchDomainFacade.update(
      item,
      body as Partial<Match>,
    )
    return itemUpdated
  }

  @Delete('/:matchId')
  async delete(@Param('matchId') matchId: string) {
    const item = await this.matchDomainFacade.findOneByIdOrFail(matchId)

    await this.matchDomainFacade.delete(item)

    return item
  }
}
