import { GAME_ACTION_TYPES } from '../actions'
import { Card, Player, Reaction, StoreAction } from '../../interfaces'

interface GameState {
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

export const gameReducer = (state: GameState = initialState, action: StoreAction<GAME_ACTION_TYPES>): GameState => {
  if (action && reactions[action.type]) {
    return reactions[action.type](state, action)
  }

  return { ...state }
}
