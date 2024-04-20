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

import { Game } from '../../../modules/game/domain'

import { User } from '../../../modules/user/domain'

import { Match } from '../../../modules/match/domain'

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  status?: string

  @Column({})
  gameId: string

  @ManyToOne(() => Game, parent => parent.tournaments)
  @JoinColumn({ name: 'gameId' })
  game?: Game

  @Column({})
  organizerId: string

  @ManyToOne(() => User, parent => parent.tournamentsAsOrganizer)
  @JoinColumn({ name: 'organizerId' })
  organizer?: User

  @OneToMany(() => Match, child => child.tournament)
  matchs?: Match[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
