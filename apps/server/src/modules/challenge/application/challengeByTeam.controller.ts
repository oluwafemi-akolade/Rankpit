import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ChallengeDomainFacade } from '@server/modules/challenge/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ChallengeApplicationEvent } from './challenge.application.event'
import { ChallengeCreateDto } from './challenge.dto'

import { TeamDomainFacade } from '../../team/domain'

@Controller('/v1/teams')
export class ChallengeByTeamController {
  constructor(
    private teamDomainFacade: TeamDomainFacade,

    private challengeDomainFacade: ChallengeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/challengerTeam/:challengerTeamId/challenges')
  async findManyChallengerTeamId(
    @Param('challengerTeamId') challengerTeamId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.teamDomainFacade.findOneByIdOrFail(challengerTeamId)

    const items = await this.challengeDomainFacade.findManyByChallengerTeam(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challengerTeam/:challengerTeamId/challenges')
  async createByChallengerTeamId(
    @Param('challengerTeamId') challengerTeamId: string,
    @Body() body: ChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengerTeamId }

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

  @Get('/challengedTeam/:challengedTeamId/challenges')
  async findManyChallengedTeamId(
    @Param('challengedTeamId') challengedTeamId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.teamDomainFacade.findOneByIdOrFail(challengedTeamId)

    const items = await this.challengeDomainFacade.findManyByChallengedTeam(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challengedTeam/:challengedTeamId/challenges')
  async createByChallengedTeamId(
    @Param('challengedTeamId') challengedTeamId: string,
    @Body() body: ChallengeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengedTeamId }

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
