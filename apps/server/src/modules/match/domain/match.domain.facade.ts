import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Match } from './match.model'

import { Tournament } from '../../tournament/domain'

import { Team } from '../../team/domain'

import { Challenge } from '../../challenge/domain'

@Injectable()
export class MatchDomainFacade {
  constructor(
    @InjectRepository(Match)
    private repository: Repository<Match>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Match>): Promise<Match> {
    return this.repository.save(values)
  }

  async update(item: Match, values: Partial<Match>): Promise<Match> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Match): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match> {
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

  async findManyByTournament(
    item: Tournament,
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('tournament')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        tournamentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByTeam1(
    item: Team,
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('team1')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        team1Id: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByTeam2(
    item: Team,
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('team2')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        team2Id: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByChallenge(
    item: Challenge,
    queryOptions: RequestHelper.QueryOptions<Match> = {},
  ): Promise<Match[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('challenge')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        challengeId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
