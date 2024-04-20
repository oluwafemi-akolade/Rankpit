import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Article } from './article.model'

import { User } from '../../user/domain'

@Injectable()
export class ArticleDomainFacade {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Article>): Promise<Article> {
    return this.repository.save(values)
  }

  async update(item: Article, values: Partial<Article>): Promise<Article> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Article): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Article> = {},
  ): Promise<Article[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Article> = {},
  ): Promise<Article> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByAuthor(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Article> = {},
  ): Promise<Article[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('author')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        authorId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
