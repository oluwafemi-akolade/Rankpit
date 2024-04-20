import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ArticleDomainModule } from '../domain'
import { ArticleController } from './article.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ArticleByUserController } from './articleByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ArticleDomainModule, UserDomainModule],
  controllers: [ArticleController, ArticleByUserController],
  providers: [],
})
export class ArticleApplicationModule {}
