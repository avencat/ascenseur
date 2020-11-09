import { Action } from 'redux'

export interface StoreAction<T> extends Action<T> {
  data: any
}
export type Reaction<S, T> = (state: S, action: StoreAction<T>) => S
