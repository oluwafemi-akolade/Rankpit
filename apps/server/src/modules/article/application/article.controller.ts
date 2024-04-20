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
import { Article, ArticleDomainFacade } from '@server/modules/article/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ArticleApplicationEvent } from './article.application.event'
import { ArticleCreateDto, ArticleUpdateDto } from './article.dto'

@Controller('/v1/articles')
export class ArticleController {
  constructor(
    private eventService: EventService,
    private articleDomainFacade: ArticleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.articleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ArticleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.articleDomainFacade.create(body)

    await this.eventService.emit<ArticleApplicationEvent.ArticleCreated.Payload>(
      ArticleApplicationEvent.ArticleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:articleId')
  async findOne(
    @Param('articleId') articleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.articleDomainFacade.findOneByIdOrFail(
      articleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:articleId')
  async update(
    @Param('articleId') articleId: string,
    @Body() body: ArticleUpdateDto,
  ) {
    const item = await this.articleDomainFacade.findOneByIdOrFail(articleId)

    const itemUpdated = await this.articleDomainFacade.update(
      item,
      body as Partial<Article>,
    )
    return itemUpdated
  }

  @Delete('/:articleId')
  async delete(@Param('articleId') articleId: string) {
    const item = await this.articleDomainFacade.findOneByIdOrFail(articleId)

    await this.articleDomainFacade.delete(item)

    return item
  }
}
