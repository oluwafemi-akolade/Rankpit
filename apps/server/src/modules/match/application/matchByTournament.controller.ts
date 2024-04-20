import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MatchDomainFacade } from '@server/modules/match/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MatchApplicationEvent } from './match.application.event'
import { MatchCreateDto } from './match.dto'

import { TournamentDomainFacade } from '../../tournament/domain'

@Controller('/v1/tournaments')
export class MatchByTournamentController {
  constructor(
    private tournamentDomainFacade: TournamentDomainFacade,

    private matchDomainFacade: MatchDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tournament/:tournamentId/matchs')
  async findManyTournamentId(
    @Param('tournamentId') tournamentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.tournamentDomainFacade.findOneByIdOrFail(tournamentId)

    const items = await this.matchDomainFacade.findManyByTournament(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tournament/:tournamentId/matchs')
  async createByTournamentId(
    @Param('tournamentId') tournamentId: string,
    @Body() body: MatchCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tournamentId }

    const item = await this.matchDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MatchApplicationEvent.MatchCreated.Payload>(
      MatchApplicationEvent.MatchCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
