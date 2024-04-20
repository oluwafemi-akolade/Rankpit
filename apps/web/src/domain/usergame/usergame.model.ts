import { User } from '../user'

import { Game } from '../game'

export class Usergame {
  id: string

  userId: string

  user?: User

  gameId: string

  game?: Game

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
