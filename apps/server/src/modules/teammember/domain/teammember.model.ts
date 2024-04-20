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

import { User } from '../../../modules/user/domain'

@Entity()
export class Teammember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  role?: string

  @Column({})
  teamId: string

  @ManyToOne(() => Team, parent => parent.teammembers)
  @JoinColumn({ name: 'teamId' })
  team?: Team

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.teammembers)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
