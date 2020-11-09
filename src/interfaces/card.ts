export enum CardColor {
  CLUB = '♣️',
  DIAMOND = '♦️',
  HEART = '♥️',
  SPADE = '♠️'
}

export const CardNumber = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'P', 'D', 'M']

export interface Card {
  color: CardColor
  key: string
  number: number
  value: number
}
