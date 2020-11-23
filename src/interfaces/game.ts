import { SERVER_CARD_COLOR } from './card'

export interface Game {
  _id: string
  isStarted: boolean
  name: string
  nbPlayers: number
  createdAt: string // Date
  updatedAt: string // Date
}

export interface Round {
  _id: string
  asset: SERVER_CARD_COLOR // @TODO replace with Card
  assetNumber: number
  cardsDealt: number
  gameId: string
  roundNumber: number
  createdAt: string // Date
  updatedAt: string // Date
}

export interface RoundTurn {
  _id: string
  color: SERVER_CARD_COLOR // @TODO replace with Card
  colorNumber: number
  firstPlayerId: string
  gameRoundId: string
  winnerId: string
  createdAt: string // Date
  updatedAt: string // Date
}
