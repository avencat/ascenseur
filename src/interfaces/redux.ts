import { Action } from 'redux'

import { GameState, WebSocketState } from '../redux/reducer'

export interface StoreAction<T> extends Action<T> {
  data: any
}
export type Reaction<S, T> = (state: S, action: StoreAction<T>) => S

export interface GlobalState {
  game: GameState,
  webSocket: WebSocketState
}

export interface TypedStoreAction<T, D> extends Action<T> {
  data: D
}
