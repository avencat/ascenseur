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

const generateColorCards = (color: CardColor): Card[] => {
  const cards = []

  for (let number = 1; number < 14; number += 1) {
    cards.push({ color, key: `${number}-${color}`, number, value: number })
  }

  return cards
}

export const generateDeck = (): Card[] => [
  ...generateColorCards(CardColor.CLUB),
  ...generateColorCards(CardColor.DIAMOND),
  ...generateColorCards(CardColor.HEART),
  ...generateColorCards(CardColor.SPADE)
]

export const isCardRed = (color: CardColor): boolean => color === CardColor.HEART || color === CardColor.DIAMOND

export const isCardBlack = (color: CardColor): boolean => color === CardColor.SPADE || color === CardColor.CLUB
