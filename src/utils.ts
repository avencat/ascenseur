export enum CardColor {
  CLUB = 'CLUB',
  DIAMOND = 'DIAMOND',
  HEART = 'HEART',
  SPADE = 'SPADE'
}

export interface Card {
  color: CardColor;
  value: number;
}

const generateColorCards = (color: CardColor): Card[] => {
  const cards = []

  for (let value = 1; value < 14; value += 1) {
    cards.push({ color, value })
  }

  return cards
}

export const generateDeck = (): Card[] => [
  ...generateColorCards(CardColor.CLUB),
  ...generateColorCards(CardColor.DIAMOND),
  ...generateColorCards(CardColor.HEART),
  ...generateColorCards(CardColor.SPADE)
]
