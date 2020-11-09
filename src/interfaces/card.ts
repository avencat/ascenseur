export enum CardColor {
  CLUB = '♣️',
  DIAMOND = '♦️',
  HEART = '♥️',
  SPADE = '♠️'
}

export interface Card {
  color: CardColor
  key: string
  number: number
  value: number
}
