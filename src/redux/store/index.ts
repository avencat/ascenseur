import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import { gameSaga, webSocketSaga } from '../saga'
import { webSocketMiddleware } from './middlewares'
import { gameReducer, webSocketReducer } from '../reducer'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    game: gameReducer,
    webSocket: webSocketReducer
  }),
  applyMiddleware(webSocketMiddleware('ws://localhost:8000'), sagaMiddleware)
)

sagaMiddleware.run(gameSaga)
sagaMiddleware.run(webSocketSaga)
