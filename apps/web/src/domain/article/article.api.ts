import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Article } from './article.model'

export class ArticleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Article>,
  ): Promise<Article[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/articles${buildOptions}`)
  }

  static findOne(
    articleId: string,
    queryOptions?: ApiHelper.QueryOptions<Article>,
  ): Promise<Article> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/articles/${articleId}${buildOptions}`)
  }

  static createOne(values: Partial<Article>): Promise<Article> {
    return HttpService.api.post(`/v1/articles`, values)
  }

  static updateOne(
    articleId: string,
    values: Partial<Article>,
  ): Promise<Article> {
    return HttpService.api.patch(`/v1/articles/${articleId}`, values)
  }

  static deleteOne(articleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/articles/${articleId}`)
  }

  static findManyByAuthorId(
    authorId: string,
    queryOptions?: ApiHelper.QueryOptions<Article>,
  ): Promise<Article[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/author/${authorId}/articles${buildOptions}`,
    )
  }

  static createOneByAuthorId(
    authorId: string,
    values: Partial<Article>,
  ): Promise<Article> {
    return HttpService.api.post(`/v1/users/author/${authorId}/articles`, values)
  }
}
