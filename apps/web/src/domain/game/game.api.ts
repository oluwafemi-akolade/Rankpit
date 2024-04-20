import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Game } from './game.model'

export class GameApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Game>,
  ): Promise<Game[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/games${buildOptions}`)
  }

  static findOne(
    gameId: string,
    queryOptions?: ApiHelper.QueryOptions<Game>,
  ): Promise<Game> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/games/${gameId}${buildOptions}`)
  }

  static createOne(values: Partial<Game>): Promise<Game> {
    return HttpService.api.post(`/v1/games`, values)
  }

  static updateOne(gameId: string, values: Partial<Game>): Promise<Game> {
    return HttpService.api.patch(`/v1/games/${gameId}`, values)
  }

  static deleteOne(gameId: string): Promise<void> {
    return HttpService.api.delete(`/v1/games/${gameId}`)
  }
}
