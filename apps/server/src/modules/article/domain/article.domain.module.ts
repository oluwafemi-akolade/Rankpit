import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ArticleDomainFacade } from './article.domain.facade'
import { Article } from './article.model'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), DatabaseHelperModule],
  providers: [ArticleDomainFacade, ArticleDomainFacade],
  exports: [ArticleDomainFacade],
})
export class ArticleDomainModule {}
