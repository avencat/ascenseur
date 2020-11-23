import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import { gameSaga, webSocketSaga } from '../saga'
import { webSocketMiddleware } from './middlewares'
import { gameReducer, webSocketReducer } from '../reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  game: gameReducer,
  webSocket: webSocketReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  applyMiddleware(webSocketMiddleware('ws://localhost:8000'), sagaMiddleware)
)

export const persistedStore = persistStore(store)

sagaMiddleware.run(gameSaga)
sagaMiddleware.run(webSocketSaga)
