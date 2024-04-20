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
import { Team, TeamDomainFacade } from '@server/modules/team/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TeamApplicationEvent } from './team.application.event'
import { TeamCreateDto, TeamUpdateDto } from './team.dto'

@Controller('/v1/teams')
export class TeamController {
  constructor(
    private eventService: EventService,
    private teamDomainFacade: TeamDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.teamDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TeamCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.teamDomainFacade.create(body)

    await this.eventService.emit<TeamApplicationEvent.TeamCreated.Payload>(
      TeamApplicationEvent.TeamCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:teamId')
  async findOne(@Param('teamId') teamId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.teamDomainFacade.findOneByIdOrFail(
      teamId,
      queryOptions,
    )

    return item
  }

  @Patch('/:teamId')
  async update(@Param('teamId') teamId: string, @Body() body: TeamUpdateDto) {
    const item = await this.teamDomainFacade.findOneByIdOrFail(teamId)

    const itemUpdated = await this.teamDomainFacade.update(
      item,
      body as Partial<Team>,
    )
    return itemUpdated
  }

  @Delete('/:teamId')
  async delete(@Param('teamId') teamId: string) {
    const item = await this.teamDomainFacade.findOneByIdOrFail(teamId)

    await this.teamDomainFacade.delete(item)

    return item
  }
}
