import { GAME_ACTION_TYPES } from '../actions'
import { Card, Player, Reaction, StoreAction } from '../../interfaces'

export interface GameState {
  deck: Card[]
  players: Player[]
}

const initialState: GameState = {
  deck: [],
  players: []
}

const reactions: Record<GAME_ACTION_TYPES, Reaction<GameState, GAME_ACTION_TYPES>> = {
  [GAME_ACTION_TYPES.INIT_GAME]: () => initialState
}

export const gameReducer = (prevState: GameState, action: StoreAction<GAME_ACTION_TYPES>): GameState => {
  const state = prevState || initialState

  if (action && reactions[action.type]) {
    return reactions[action.type](state, action)
  }

  return { ...state }
}
