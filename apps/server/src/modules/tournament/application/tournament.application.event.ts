export namespace TournamentApplicationEvent {
  export namespace TournamentCreated {
    export const key = 'tournament.application.tournament.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
