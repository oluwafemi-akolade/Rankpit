export namespace TeammemberApplicationEvent {
  export namespace TeammemberCreated {
    export const key = 'teammember.application.teammember.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
