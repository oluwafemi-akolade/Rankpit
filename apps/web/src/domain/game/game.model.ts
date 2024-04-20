import { Usergame } from '../usergame'

import { Tournament } from '../tournament'

import { Challenge } from '../challenge'

export class Game {
  id: string

  name?: string

  genre?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  usergames?: Usergame[]

  tournaments?: Tournament[]

  challenges?: Challenge[]
}
