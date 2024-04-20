import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Team } from '../../../modules/team/domain'

import { Game } from '../../../modules/game/domain'

import { Match } from '../../../modules/match/domain'

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  status?: string

  @Column({})
  challengerTeamId: string

  @ManyToOne(() => Team, parent => parent.challengesAsChallengerTeam)
  @JoinColumn({ name: 'challengerTeamId' })
  challengerTeam?: Team

  @Column({})
  challengedTeamId: string

  @ManyToOne(() => Team, parent => parent.challengesAsChallengedTeam)
  @JoinColumn({ name: 'challengedTeamId' })
  challengedTeam?: Team

  @Column({})
  gameId: string

  @ManyToOne(() => Game, parent => parent.challenges)
  @JoinColumn({ name: 'gameId' })
  game?: Game

  @OneToMany(() => Match, child => child.challenge)
  matchs?: Match[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
