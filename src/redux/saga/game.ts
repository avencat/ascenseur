import { put, select, takeLatest } from 'redux-saga/effects'

import { formatPacketMessage } from '../../utils/webSocket'
import { GAME_ACTION_TYPES, sendMessage, WEB_SOCKET_CHANNEL } from '../actions'
import {
  GlobalState,
  TypedStoreAction,
  WEB_SOCKET_ACTION,
} from '../../interfaces'

function * initGame ({
  data: {
    name,
    nbPlayers
  }
}: TypedStoreAction<
  GAME_ACTION_TYPES.INIT_GAME,
  {
    name: string
    nbPlayers: number
  }
>) {
  const message = formatPacketMessage({
    to: WEB_SOCKET_CHANNEL.LOBBY,
    message: { action: WEB_SOCKET_ACTION.INIT_GAME, data: { name, nbPlayers } }
  })

  yield put(sendMessage(message))
}

function * listGames () {
  const message = formatPacketMessage({
    to: WEB_SOCKET_CHANNEL.LOBBY,
    message: { action: WEB_SOCKET_ACTION.LIST_GAMES }
  })

  yield put(sendMessage(message))
}

function * joinGame ({
  data: {
    game,
    name
  }
}: TypedStoreAction<
  GAME_ACTION_TYPES.JOIN_GAME,
  {
    game: string
    name: string
  }
>) {
  const message = formatPacketMessage({
    to: WEB_SOCKET_CHANNEL.LOBBY,
    message: { action: WEB_SOCKET_ACTION.JOIN_GAME, data: { game, name } },
  })

  yield put(sendMessage(message))
}

function * setBet ({
  data: { bet }
}: TypedStoreAction<
  GAME_ACTION_TYPES.SET_BET,
  { bet: number }
>) {
  const game = yield select((state: GlobalState) => state.game.game?._id)

  const message = formatPacketMessage({
    to: game,
    message: { action: WEB_SOCKET_ACTION.SET_BET, data: { bet } }
  })

  yield put(sendMessage(message))
}

function * playCard({
  data: { cardId: playerCard }
}: TypedStoreAction<GAME_ACTION_TYPES.PLAY_CARD, { cardId: string }>) {
  const game = yield select((state: GlobalState) => state.game.game?._id)
  const gameTurn = yield select((state: GlobalState) => state.game.turn?._id)

  const message = formatPacketMessage({
    to: game,
    message: {
      action: WEB_SOCKET_ACTION.PLAY_CARD,
      data: { playerCard, gameTurn }
    }
  })

  yield put(sendMessage(message))
}

export function * gameSaga () {
  yield takeLatest(GAME_ACTION_TYPES.JOIN_GAME, joinGame)
  yield takeLatest(GAME_ACTION_TYPES.INIT_GAME, initGame)
  yield takeLatest(GAME_ACTION_TYPES.LIST_GAMES, listGames)
  yield takeLatest(GAME_ACTION_TYPES.SET_BET, setBet)
  yield takeLatest(GAME_ACTION_TYPES.PLAY_CARD, playCard)
}
