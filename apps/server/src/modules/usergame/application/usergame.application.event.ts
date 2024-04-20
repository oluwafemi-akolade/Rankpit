export namespace UsergameApplicationEvent {
  export namespace UsergameCreated {
    export const key = 'usergame.application.usergame.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
