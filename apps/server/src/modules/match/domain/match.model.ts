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

import { Tournament } from '../../../modules/tournament/domain'

import { Team } from '../../../modules/team/domain'

import { Challenge } from '../../../modules/challenge/domain'

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  result?: string

  @Column({})
  tournamentId: string

  @ManyToOne(() => Tournament, parent => parent.matchs)
  @JoinColumn({ name: 'tournamentId' })
  tournament?: Tournament

  @Column({})
  team1Id: string

  @ManyToOne(() => Team, parent => parent.matchsAsTeam1)
  @JoinColumn({ name: 'team1Id' })
  team1?: Team

  @Column({})
  team2Id: string

  @ManyToOne(() => Team, parent => parent.matchsAsTeam2)
  @JoinColumn({ name: 'team2Id' })
  team2?: Team

  @Column({})
  challengeId: string

  @ManyToOne(() => Challenge, parent => parent.matchs)
  @JoinColumn({ name: 'challengeId' })
  challenge?: Challenge

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
