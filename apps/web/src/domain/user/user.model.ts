import { Notification } from '../notification'

import { Profile } from '../profile'

import { Usergame } from '../usergame'

import { Teammember } from '../teammember'

import { Message } from '../message'

import { Article } from '../article'

import { Tournament } from '../tournament'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  profiles?: Profile[]

  usergames?: Usergame[]

  teammembers?: Teammember[]

  messagesAsSender?: Message[]

  messagesAsReceiver?: Message[]

  articlesAsAuthor?: Article[]

  tournamentsAsOrganizer?: Tournament[]
}
