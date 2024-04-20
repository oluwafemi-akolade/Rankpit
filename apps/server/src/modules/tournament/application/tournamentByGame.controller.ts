import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TournamentDomainFacade } from '@server/modules/tournament/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TournamentApplicationEvent } from './tournament.application.event'
import { TournamentCreateDto } from './tournament.dto'

import { GameDomainFacade } from '../../game/domain'

@Controller('/v1/games')
export class TournamentByGameController {
  constructor(
    private gameDomainFacade: GameDomainFacade,

    private tournamentDomainFacade: TournamentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/game/:gameId/tournaments')
  async findManyGameId(
    @Param('gameId') gameId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.gameDomainFacade.findOneByIdOrFail(gameId)

    const items = await this.tournamentDomainFacade.findManyByGame(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/game/:gameId/tournaments')
  async createByGameId(
    @Param('gameId') gameId: string,
    @Body() body: TournamentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, gameId }

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
