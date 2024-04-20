export namespace TeamApplicationEvent {
  export namespace TeamCreated {
    export const key = 'team.application.team.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
