export interface Player {
  _id: string
  bet?: number
  gameId: string
  name: string
  position: number | undefined
  score: number
  socketId: number
  turnWon: number | undefined
}
