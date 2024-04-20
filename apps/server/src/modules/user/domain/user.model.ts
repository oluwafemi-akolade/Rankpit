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

import { Notification } from '../../../modules/notification/domain'

import { Profile } from '../../../modules/profile/domain'

import { Usergame } from '../../../modules/usergame/domain'

import { Teammember } from '../../../modules/teammember/domain'

import { Message } from '../../../modules/message/domain'

import { Article } from '../../../modules/article/domain'

import { Tournament } from '../../../modules/tournament/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Profile, child => child.user)
  profiles?: Profile[]

  @OneToMany(() => Usergame, child => child.user)
  usergames?: Usergame[]

  @OneToMany(() => Teammember, child => child.user)
  teammembers?: Teammember[]

  @OneToMany(() => Message, child => child.sender)
  messagesAsSender?: Message[]

  @OneToMany(() => Message, child => child.receiver)
  messagesAsReceiver?: Message[]

  @OneToMany(() => Article, child => child.author)
  articlesAsAuthor?: Article[]

  @OneToMany(() => Tournament, child => child.organizer)
  tournamentsAsOrganizer?: Tournament[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
