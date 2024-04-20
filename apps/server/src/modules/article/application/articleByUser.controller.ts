import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ArticleDomainFacade } from '@server/modules/article/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ArticleApplicationEvent } from './article.application.event'
import { ArticleCreateDto } from './article.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ArticleByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private articleDomainFacade: ArticleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/author/:authorId/articles')
  async findManyAuthorId(
    @Param('authorId') authorId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(authorId)

    const items = await this.articleDomainFacade.findManyByAuthor(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/author/:authorId/articles')
  async createByAuthorId(
    @Param('authorId') authorId: string,
    @Body() body: ArticleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, authorId }

    const item = await this.articleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ArticleApplicationEvent.ArticleCreated.Payload>(
      ArticleApplicationEvent.ArticleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
