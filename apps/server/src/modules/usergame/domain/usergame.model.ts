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

import { User } from '../../../modules/user/domain'

import { Game } from '../../../modules/game/domain'

@Entity()
export class Usergame {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.usergames)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  gameId: string

  @ManyToOne(() => Game, parent => parent.usergames)
  @JoinColumn({ name: 'gameId' })
  game?: Game

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
