import { Tournament } from '../tournament'

import { Team } from '../team'

import { Challenge } from '../challenge'

export class Match {
  id: string

  result?: string

  tournamentId: string

  tournament?: Tournament

  team1Id: string

  team1?: Team

  team2Id: string

  team2?: Team

  challengeId: string

  challenge?: Challenge

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
