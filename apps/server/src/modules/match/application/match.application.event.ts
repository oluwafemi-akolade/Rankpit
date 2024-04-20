export namespace MatchApplicationEvent {
  export namespace MatchCreated {
    export const key = 'match.application.match.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
