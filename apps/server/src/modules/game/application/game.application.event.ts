export namespace GameApplicationEvent {
  export namespace GameCreated {
    export const key = 'game.application.game.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
