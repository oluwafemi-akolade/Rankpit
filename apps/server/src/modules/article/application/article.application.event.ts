export namespace ArticleApplicationEvent {
  export namespace ArticleCreated {
    export const key = 'article.application.article.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
