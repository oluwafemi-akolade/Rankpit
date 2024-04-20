import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TeammemberDomainFacade } from '@server/modules/teammember/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TeammemberApplicationEvent } from './teammember.application.event'
import { TeammemberCreateDto } from './teammember.dto'

import { TeamDomainFacade } from '../../team/domain'

@Controller('/v1/teams')
export class TeammemberByTeamController {
  constructor(
    private teamDomainFacade: TeamDomainFacade,

    private teammemberDomainFacade: TeammemberDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/team/:teamId/teammembers')
  async findManyTeamId(
    @Param('teamId') teamId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.teamDomainFacade.findOneByIdOrFail(teamId)

    const items = await this.teammemberDomainFacade.findManyByTeam(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/team/:teamId/teammembers')
  async createByTeamId(
    @Param('teamId') teamId: string,
    @Body() body: TeammemberCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, teamId }

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
