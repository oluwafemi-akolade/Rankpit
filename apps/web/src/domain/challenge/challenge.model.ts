import { Team } from '../team'

import { Game } from '../game'

import { Match } from '../match'

export class Challenge {
  id: string

  status?: string

  challengerTeamId: string

  challengerTeam?: Team

  challengedTeamId: string

  challengedTeam?: Team

  gameId: string

  game?: Game

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  matchs?: Match[]
}
