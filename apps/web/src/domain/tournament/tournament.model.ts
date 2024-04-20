import { Game } from '../game'

import { User } from '../user'

import { Match } from '../match'

export class Tournament {
  id: string

  name?: string

  status?: string

  gameId: string

  game?: Game

  organizerId: string

  organizer?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  matchs?: Match[]
}
