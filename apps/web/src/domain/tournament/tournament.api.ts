import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tournament } from './tournament.model'

export class TournamentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Tournament>,
  ): Promise<Tournament[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tournaments${buildOptions}`)
  }

  static findOne(
    tournamentId: string,
    queryOptions?: ApiHelper.QueryOptions<Tournament>,
  ): Promise<Tournament> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tournaments/${tournamentId}${buildOptions}`)
  }

  static createOne(values: Partial<Tournament>): Promise<Tournament> {
    return HttpService.api.post(`/v1/tournaments`, values)
  }

  static updateOne(
    tournamentId: string,
    values: Partial<Tournament>,
  ): Promise<Tournament> {
    return HttpService.api.patch(`/v1/tournaments/${tournamentId}`, values)
  }

  static deleteOne(tournamentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tournaments/${tournamentId}`)
  }

  static findManyByGameId(
    gameId: string,
    queryOptions?: ApiHelper.QueryOptions<Tournament>,
  ): Promise<Tournament[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/games/game/${gameId}/tournaments${buildOptions}`,
    )
  }

  static createOneByGameId(
    gameId: string,
    values: Partial<Tournament>,
  ): Promise<Tournament> {
    return HttpService.api.post(`/v1/games/game/${gameId}/tournaments`, values)
  }

  static findManyByOrganizerId(
    organizerId: string,
    queryOptions?: ApiHelper.QueryOptions<Tournament>,
  ): Promise<Tournament[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/organizer/${organizerId}/tournaments${buildOptions}`,
    )
  }

  static createOneByOrganizerId(
    organizerId: string,
    values: Partial<Tournament>,
  ): Promise<Tournament> {
    return HttpService.api.post(
      `/v1/users/organizer/${organizerId}/tournaments`,
      values,
    )
  }
}
