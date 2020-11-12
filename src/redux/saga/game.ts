import { put, takeLatest } from 'redux-saga/effects'

import { formatPacketMessage } from '../../utils/webSocket'
import { Message, WEB_SOCKET_ACTION } from '../../interfaces'
import { GAME_ACTION_TYPES, sendMessage, WEB_SOCKET_CHANNEL } from '../actions'

function * initGame ({ data: { nbPlayers } }: { data: { nbPlayers: number } }) {
  const message: Message = formatPacketMessage({
    to: WEB_SOCKET_CHANNEL.LOBBY,
    message: { action: WEB_SOCKET_ACTION.INIT_GAME, data: { nbPlayers } }
  })

  yield put(sendMessage(message))
}

export function * gameSaga () {
  yield takeLatest(GAME_ACTION_TYPES.INIT_GAME, initGame)
}
