import { Card } from './card'

export interface Player {
  hand: Card[]
  name: string
  points: number
}
