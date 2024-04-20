import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Usergame } from './usergame.model'

export class UsergameApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Usergame>,
  ): Promise<Usergame[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/usergames${buildOptions}`)
  }

  static findOne(
    usergameId: string,
    queryOptions?: ApiHelper.QueryOptions<Usergame>,
  ): Promise<Usergame> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/usergames/${usergameId}${buildOptions}`)
  }

  static createOne(values: Partial<Usergame>): Promise<Usergame> {
    return HttpService.api.post(`/v1/usergames`, values)
  }

  static updateOne(
    usergameId: string,
    values: Partial<Usergame>,
  ): Promise<Usergame> {
    return HttpService.api.patch(`/v1/usergames/${usergameId}`, values)
  }

  static deleteOne(usergameId: string): Promise<void> {
    return HttpService.api.delete(`/v1/usergames/${usergameId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Usergame>,
  ): Promise<Usergame[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/usergames${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Usergame>,
  ): Promise<Usergame> {
    return HttpService.api.post(`/v1/users/user/${userId}/usergames`, values)
  }

  static findManyByGameId(
    gameId: string,
    queryOptions?: ApiHelper.QueryOptions<Usergame>,
  ): Promise<Usergame[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/games/game/${gameId}/usergames${buildOptions}`,
    )
  }

  static createOneByGameId(
    gameId: string,
    values: Partial<Usergame>,
  ): Promise<Usergame> {
    return HttpService.api.post(`/v1/games/game/${gameId}/usergames`, values)
  }
}
