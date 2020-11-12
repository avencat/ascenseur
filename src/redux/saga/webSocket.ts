import { put, takeEvery } from 'redux-saga/effects'

import { Message, WebSocketData } from '../../interfaces'
import { formatConnectMessage } from '../../utils/webSocket'
import {
  sendMessage,
  WEB_SOCKET_ACTION_TYPES,
  WEB_SOCKET_CHANNEL
} from '../actions'

function * connectedSaga () {
  yield put(sendMessage(formatConnectMessage(WEB_SOCKET_CHANNEL.LOBBY)))
}

function * messageReceivedSaga ({ data: { message } }: { data: { message: Message } }) {
  console.log(message)
}

function * invalidMessageReceivedSaga ({ data: { message } }: { data: { message: WebSocketData } }) {
  console.log(message)
}

export function * webSocketSaga () {
  yield takeEvery(WEB_SOCKET_ACTION_TYPES.CONNECTED, connectedSaga)
  yield takeEvery(WEB_SOCKET_ACTION_TYPES.MESSAGE_RECEIVED, messageReceivedSaga)
  yield takeEvery(WEB_SOCKET_ACTION_TYPES.INVALID_MESSAGE_RECEIVED, invalidMessageReceivedSaga)
}
