import { Card, CardColor } from './interfaces/card'

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
  const arr = [];

  for (let i = 0; i < length; i+= 1) {
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
