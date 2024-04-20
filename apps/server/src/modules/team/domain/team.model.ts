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

import { Teammember } from '../../../modules/teammember/domain'

import { Challenge } from '../../../modules/challenge/domain'

import { Match } from '../../../modules/match/domain'

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Teammember, child => child.team)
  teammembers?: Teammember[]

  @OneToMany(() => Challenge, child => child.challengerTeam)
  challengesAsChallengerTeam?: Challenge[]

  @OneToMany(() => Challenge, child => child.challengedTeam)
  challengesAsChallengedTeam?: Challenge[]

  @OneToMany(() => Match, child => child.team1)
  matchsAsTeam1?: Match[]

  @OneToMany(() => Match, child => child.team2)
  matchsAsTeam2?: Match[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
