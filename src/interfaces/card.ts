import { Player } from './player'

export enum CARD_COLOR {
  CLUB = '♣️',
  DIAMOND = '♦️',
  HEART = '♥️',
  SPADE = '♠️'
}

export enum SERVER_CARD_COLOR {
  'CLUB' = 'club',
  'DIAMOND' = 'diamond',
  'HEART' = 'heart',
  'SPADE' = 'spade'
}

export const convertServerCardColorToCardColor = (color: SERVER_CARD_COLOR): CARD_COLOR => {
  switch (color) {
    case SERVER_CARD_COLOR.CLUB:
      return CARD_COLOR.CLUB
    case SERVER_CARD_COLOR.DIAMOND:
      return CARD_COLOR.DIAMOND
    case SERVER_CARD_COLOR.HEART:
      return CARD_COLOR.HEART
    default:
      return CARD_COLOR.SPADE
  }
}

export const CardNumber = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'P', 'D', 'M']

export interface Card {
  color: CARD_COLOR
  identifier: string
  number: number
  value: number
}

export interface ServerCard {
  _id: string
  color: SERVER_CARD_COLOR
  number: number
  createdAt: string // Date
  updatedAt: string // Date
}

export interface PlayerCard {
  _id: string
  card: ServerCard
  cardId: string
  playerId: string
  createdAt: string // Date
  updatedAt: string // Date
}

export interface PlayedCard {
  card: ServerCard
  player: Player
}
