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
  Tournament,
  TournamentDomainFacade,
} from '@server/modules/tournament/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TournamentApplicationEvent } from './tournament.application.event'
import { TournamentCreateDto, TournamentUpdateDto } from './tournament.dto'

@Controller('/v1/tournaments')
export class TournamentController {
  constructor(
    private eventService: EventService,
    private tournamentDomainFacade: TournamentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.tournamentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TournamentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tournamentDomainFacade.create(body)

    await this.eventService.emit<TournamentApplicationEvent.TournamentCreated.Payload>(
      TournamentApplicationEvent.TournamentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tournamentId')
  async findOne(
    @Param('tournamentId') tournamentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tournamentDomainFacade.findOneByIdOrFail(
      tournamentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tournamentId')
  async update(
    @Param('tournamentId') tournamentId: string,
    @Body() body: TournamentUpdateDto,
  ) {
    const item =
      await this.tournamentDomainFacade.findOneByIdOrFail(tournamentId)

    const itemUpdated = await this.tournamentDomainFacade.update(
      item,
      body as Partial<Tournament>,
    )
    return itemUpdated
  }

  @Delete('/:tournamentId')
  async delete(@Param('tournamentId') tournamentId: string) {
    const item =
      await this.tournamentDomainFacade.findOneByIdOrFail(tournamentId)

    await this.tournamentDomainFacade.delete(item)

    return item
  }
}
