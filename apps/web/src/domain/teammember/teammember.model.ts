import { Team } from '../team'

import { User } from '../user'

export class Teammember {
  id: string

  role?: string

  teamId: string

  team?: Team

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
