import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Teammember } from './teammember.model'

export class TeammemberApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Teammember>,
  ): Promise<Teammember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teammembers${buildOptions}`)
  }

  static findOne(
    teammemberId: string,
    queryOptions?: ApiHelper.QueryOptions<Teammember>,
  ): Promise<Teammember> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/teammembers/${teammemberId}${buildOptions}`)
  }

  static createOne(values: Partial<Teammember>): Promise<Teammember> {
    return HttpService.api.post(`/v1/teammembers`, values)
  }

  static updateOne(
    teammemberId: string,
    values: Partial<Teammember>,
  ): Promise<Teammember> {
    return HttpService.api.patch(`/v1/teammembers/${teammemberId}`, values)
  }

  static deleteOne(teammemberId: string): Promise<void> {
    return HttpService.api.delete(`/v1/teammembers/${teammemberId}`)
  }

  static findManyByTeamId(
    teamId: string,
    queryOptions?: ApiHelper.QueryOptions<Teammember>,
  ): Promise<Teammember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/teams/team/${teamId}/teammembers${buildOptions}`,
    )
  }

  static createOneByTeamId(
    teamId: string,
    values: Partial<Teammember>,
  ): Promise<Teammember> {
    return HttpService.api.post(`/v1/teams/team/${teamId}/teammembers`, values)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Teammember>,
  ): Promise<Teammember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/teammembers${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Teammember>,
  ): Promise<Teammember> {
    return HttpService.api.post(`/v1/users/user/${userId}/teammembers`, values)
  }
}
