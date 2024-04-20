import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UsergameDomainFacade } from '@server/modules/usergame/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UsergameApplicationEvent } from './usergame.application.event'
import { UsergameCreateDto } from './usergame.dto'

import { GameDomainFacade } from '../../game/domain'

@Controller('/v1/games')
export class UsergameByGameController {
  constructor(
    private gameDomainFacade: GameDomainFacade,

    private usergameDomainFacade: UsergameDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/game/:gameId/usergames')
  async findManyGameId(
    @Param('gameId') gameId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.gameDomainFacade.findOneByIdOrFail(gameId)

    const items = await this.usergameDomainFacade.findManyByGame(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/game/:gameId/usergames')
  async createByGameId(
    @Param('gameId') gameId: string,
    @Body() body: UsergameCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, gameId }

    const item = await this.usergameDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UsergameApplicationEvent.UsergameCreated.Payload>(
      UsergameApplicationEvent.UsergameCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
