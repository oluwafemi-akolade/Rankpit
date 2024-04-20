import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ChallengeDomainFacade } from '@server/modules/challenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ChallengeApplicationEvent } from './challenge.application.event'
import { ChallengeCreateDto } from './challenge.dto'

import { GameDomainFacade } from '../../game/domain'

@Controller('/v1/games')
export class ChallengeByGameController {
  constructor(
    private gameDomainFacade: GameDomainFacade,

    private challengeDomainFacade: ChallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/game/:gameId/challenges')
  async findManyGameId(
    @Param('gameId') gameId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.gameDomainFacade.findOneByIdOrFail(gameId)

    const items = await this.challengeDomainFacade.findManyByGame(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/game/:gameId/challenges')
  async createByGameId(
    @Param('gameId') gameId: string,
    @Body() body: ChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, gameId }

    const item = await this.challengeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ChallengeApplicationEvent.ChallengeCreated.Payload>(
      ChallengeApplicationEvent.ChallengeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
