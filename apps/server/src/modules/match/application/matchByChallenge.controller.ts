import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MatchDomainFacade } from '@server/modules/match/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MatchApplicationEvent } from './match.application.event'
import { MatchCreateDto } from './match.dto'

import { ChallengeDomainFacade } from '../../challenge/domain'

@Controller('/v1/challenges')
export class MatchByChallengeController {
  constructor(
    private challengeDomainFacade: ChallengeDomainFacade,

    private matchDomainFacade: MatchDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/challenge/:challengeId/matchs')
  async findManyChallengeId(
    @Param('challengeId') challengeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.challengeDomainFacade.findOneByIdOrFail(challengeId)

    const items = await this.matchDomainFacade.findManyByChallenge(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/challenge/:challengeId/matchs')
  async createByChallengeId(
    @Param('challengeId') challengeId: string,
    @Body() body: MatchCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, challengeId }

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
