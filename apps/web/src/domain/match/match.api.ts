import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Match } from './match.model'

export class MatchApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/matchs${buildOptions}`)
  }

  static findOne(
    matchId: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/matchs/${matchId}${buildOptions}`)
  }

  static createOne(values: Partial<Match>): Promise<Match> {
    return HttpService.api.post(`/v1/matchs`, values)
  }

  static updateOne(matchId: string, values: Partial<Match>): Promise<Match> {
    return HttpService.api.patch(`/v1/matchs/${matchId}`, values)
  }

  static deleteOne(matchId: string): Promise<void> {
    return HttpService.api.delete(`/v1/matchs/${matchId}`)
  }

  static findManyByTournamentId(
    tournamentId: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tournaments/tournament/${tournamentId}/matchs${buildOptions}`,
    )
  }

  static createOneByTournamentId(
    tournamentId: string,
    values: Partial<Match>,
  ): Promise<Match> {
    return HttpService.api.post(
      `/v1/tournaments/tournament/${tournamentId}/matchs`,
      values,
    )
  }

  static findManyByTeam1Id(
    team1Id: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/teams/team1/${team1Id}/matchs${buildOptions}`,
    )
  }

  static createOneByTeam1Id(
    team1Id: string,
    values: Partial<Match>,
  ): Promise<Match> {
    return HttpService.api.post(`/v1/teams/team1/${team1Id}/matchs`, values)
  }

  static findManyByTeam2Id(
    team2Id: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/teams/team2/${team2Id}/matchs${buildOptions}`,
    )
  }

  static createOneByTeam2Id(
    team2Id: string,
    values: Partial<Match>,
  ): Promise<Match> {
    return HttpService.api.post(`/v1/teams/team2/${team2Id}/matchs`, values)
  }

  static findManyByChallengeId(
    challengeId: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/challenges/challenge/${challengeId}/matchs${buildOptions}`,
    )
  }

  static createOneByChallengeId(
    challengeId: string,
    values: Partial<Match>,
  ): Promise<Match> {
    return HttpService.api.post(
      `/v1/challenges/challenge/${challengeId}/matchs`,
      values,
    )
  }
}
