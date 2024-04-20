import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TournamentDomainFacade } from '@server/modules/tournament/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TournamentApplicationEvent } from './tournament.application.event'
import { TournamentCreateDto } from './tournament.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TournamentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private tournamentDomainFacade: TournamentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/organizer/:organizerId/tournaments')
  async findManyOrganizerId(
    @Param('organizerId') organizerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(organizerId)

    const items = await this.tournamentDomainFacade.findManyByOrganizer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/organizer/:organizerId/tournaments')
  async createByOrganizerId(
    @Param('organizerId') organizerId: string,
    @Body() body: TournamentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, organizerId }

    const item = await this.tournamentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TournamentApplicationEvent.TournamentCreated.Payload>(
      TournamentApplicationEvent.TournamentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
