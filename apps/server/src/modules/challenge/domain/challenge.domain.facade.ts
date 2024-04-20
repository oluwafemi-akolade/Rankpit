import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Challenge } from './challenge.model'

import { Team } from '../../team/domain'

import { Game } from '../../game/domain'

@Injectable()
export class ChallengeDomainFacade {
  constructor(
    @InjectRepository(Challenge)
    private repository: Repository<Challenge>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Challenge>): Promise<Challenge> {
    return this.repository.save(values)
  }

  async update(
    item: Challenge,
    values: Partial<Challenge>,
  ): Promise<Challenge> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Challenge): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Challenge> = {},
  ): Promise<Challenge[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Challenge> = {},
  ): Promise<Challenge> {
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

  async findManyByChallengerTeam(
    item: Team,
    queryOptions: RequestHelper.QueryOptions<Challenge> = {},
  ): Promise<Challenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('challengerTeam')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        challengerTeamId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByChallengedTeam(
    item: Team,
    queryOptions: RequestHelper.QueryOptions<Challenge> = {},
  ): Promise<Challenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('challengedTeam')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        challengedTeamId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByGame(
    item: Game,
    queryOptions: RequestHelper.QueryOptions<Challenge> = {},
  ): Promise<Challenge[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('game')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        gameId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
