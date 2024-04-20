import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Team } from './team.model'

export class TeamApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Team>,
  ): Promise<Team[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teams${buildOptions}`)
  }

  static findOne(
    teamId: string,
    queryOptions?: ApiHelper.QueryOptions<Team>,
  ): Promise<Team> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teams/${teamId}${buildOptions}`)
  }

  static createOne(values: Partial<Team>): Promise<Team> {
    return HttpService.api.post(`/v1/teams`, values)
  }

  static updateOne(teamId: string, values: Partial<Team>): Promise<Team> {
    return HttpService.api.patch(`/v1/teams/${teamId}`, values)
  }

  static deleteOne(teamId: string): Promise<void> {
    return HttpService.api.delete(`/v1/teams/${teamId}`)
  }
}
