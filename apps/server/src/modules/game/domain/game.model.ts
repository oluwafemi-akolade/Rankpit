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

import { Usergame } from '../../../modules/usergame/domain'

import { Tournament } from '../../../modules/tournament/domain'

import { Challenge } from '../../../modules/challenge/domain'

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  genre?: string

  @OneToMany(() => Usergame, child => child.game)
  usergames?: Usergame[]

  @OneToMany(() => Tournament, child => child.game)
  tournaments?: Tournament[]

  @OneToMany(() => Challenge, child => child.game)
  challenges?: Challenge[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
