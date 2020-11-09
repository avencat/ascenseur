import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { gameReducer } from './reducer'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    game: gameReducer
  }),
  applyMiddleware(sagaMiddleware)
)

// sagaMiddleware.run(Saga)
