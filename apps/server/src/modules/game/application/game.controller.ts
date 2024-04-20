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
import { Game, GameDomainFacade } from '@server/modules/game/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GameApplicationEvent } from './game.application.event'
import { GameCreateDto, GameUpdateDto } from './game.dto'

@Controller('/v1/games')
export class GameController {
  constructor(
    private eventService: EventService,
    private gameDomainFacade: GameDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.gameDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GameCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.gameDomainFacade.create(body)

    await this.eventService.emit<GameApplicationEvent.GameCreated.Payload>(
      GameApplicationEvent.GameCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:gameId')
  async findOne(@Param('gameId') gameId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.gameDomainFacade.findOneByIdOrFail(
      gameId,
      queryOptions,
    )

    return item
  }

  @Patch('/:gameId')
  async update(@Param('gameId') gameId: string, @Body() body: GameUpdateDto) {
    const item = await this.gameDomainFacade.findOneByIdOrFail(gameId)

    const itemUpdated = await this.gameDomainFacade.update(
      item,
      body as Partial<Game>,
    )
    return itemUpdated
  }

  @Delete('/:gameId')
  async delete(@Param('gameId') gameId: string) {
    const item = await this.gameDomainFacade.findOneByIdOrFail(gameId)

    await this.gameDomainFacade.delete(item)

    return item
  }
}
