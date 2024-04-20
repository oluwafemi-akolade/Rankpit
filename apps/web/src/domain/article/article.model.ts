import { User } from '../user'

export class Article {
  id: string

  title?: string

  content?: string

  authorId: string

  author?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
