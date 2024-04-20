import { Teammember } from '../teammember'

import { Challenge } from '../challenge'

import { Match } from '../match'

export class Team {
  id: string

  name?: string

  description?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  teammembers?: Teammember[]

  challengesAsChallengerTeam?: Challenge[]

  challengesAsChallengedTeam?: Challenge[]

  matchsAsTeam1?: Match[]

  matchsAsTeam2?: Match[]
}
