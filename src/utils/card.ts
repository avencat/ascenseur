import {
  Card,
  CARD_COLOR,
  convertServerCardColorToCardColor,
  PlayerCard,
  SERVER_CARD_COLOR,
  ServerCard
} from '../interfaces'

const generateColorCards = (color: CARD_COLOR): Card[] => {
  const cards = []

  for (let number = 1; number < 14; number += 1) {
    cards.push({
      color,
      identifier: `${number}-${color}`,
      number,
      value: number
    })
  }

  return cards
}

export const generateDeck = (): Card[] => [
  ...generateColorCards(CARD_COLOR.CLUB),
  ...generateColorCards(CARD_COLOR.DIAMOND),
  ...generateColorCards(CARD_COLOR.HEART),
  ...generateColorCards(CARD_COLOR.SPADE)
]

export const isCardRed = (color: CARD_COLOR): boolean => color === CARD_COLOR.HEART || color === CARD_COLOR.DIAMOND

export const isCardBlack = (color: CARD_COLOR): boolean => color === CARD_COLOR.SPADE || color === CARD_COLOR.CLUB

/**
 * Return a new array made by the initial array shuffled
 * @param {Array} arr
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const array = [...arr]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const createEmptyArray = <T>(length: number, emptyValue: T) => {
  const arr = []

  for (let i = 0; i < length; i += 1) {
    arr.push(emptyValue)
  }

  return arr
}

export const calculateColumns = (value: number) => {
  if (value < 4 || value > 10) {
    return [createEmptyArray(value, '')]
  }

  const columnValue = Math.floor(Math.min(value / 2, value > 8 ? 4 : 3))

  const restValue = value % columnValue

  const columns = []

  columns.push(createEmptyArray(columnValue, ''))

  if (restValue) {
    columns.push(createEmptyArray(restValue, ''))
  }

  columns.push(createEmptyArray(columnValue, ''))

  return columns
}

export const convertPlayerCardToCard = ({ _id, card }: PlayerCard): Card => ({
  color: convertServerCardColorToCardColor(card.color),
  identifier: _id,
  number: card.number,
  value: card.number,
})

export const convertServerCardToCard = (card: ServerCard): Card => ({
  color: convertServerCardColorToCardColor(card.color),
  identifier: card._id,
  number: card.number,
  value: card.number,
})

const SERVER_CARD_COLOR_VALUE = {
  [SERVER_CARD_COLOR.CLUB]: 0,
  [SERVER_CARD_COLOR.DIAMOND]: 1,
  [SERVER_CARD_COLOR.HEART]: 2,
  [SERVER_CARD_COLOR.SPADE]: 3
}

export const sortServerCardColor = (a: SERVER_CARD_COLOR, b: SERVER_CARD_COLOR, mainColor?: SERVER_CARD_COLOR) => {
  if (a === b) {
    return 0
  } else if (a === mainColor) {
    return -1
  } else if (b === mainColor) {
    return 1
  }

  return SERVER_CARD_COLOR_VALUE[a] - SERVER_CARD_COLOR_VALUE[b]
}

const DEFAULT_CARD_VALUE = {
  1: 13,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  11: 10,
  12: 11,
  13: 12
}

export const sortCards = (cards: PlayerCard[], color?: SERVER_CARD_COLOR, asset?: SERVER_CARD_COLOR) => {
  const cardsToPlay = cards
    .filter(({ card }) => card.color === color)

  return [...(cardsToPlay.length ? cardsToPlay : cards)]
    .sort(({ card: a }, { card: b }) => {
      const cardColorValue = sortServerCardColor(a.color, b.color, asset)

      if (cardColorValue !== 0) {
        return cardColorValue
      }

      // @ts-ignore
      return DEFAULT_CARD_VALUE[a.number] - DEFAULT_CARD_VALUE[b.number]
    })
}
