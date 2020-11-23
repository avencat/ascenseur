import { WEB_SOCKET_ACTION_TYPES } from '../actions'
import { Reaction, StoreAction } from '../../interfaces'

export interface WebSocketState {
  channel: string
  connected: boolean
  socketId?: number
}

const initialState: WebSocketState = {
  channel: '',
  connected: false
}

const reactions: Record<WEB_SOCKET_ACTION_TYPES, Reaction<WebSocketState, WEB_SOCKET_ACTION_TYPES>> = {
  [WEB_SOCKET_ACTION_TYPES.CONNECTED]: (state) => ({ ...state, connected: true }),
  [WEB_SOCKET_ACTION_TYPES.DISCONNECTED]: (state) => ({ ...state, connected: false }),
  [WEB_SOCKET_ACTION_TYPES.INVALID_MESSAGE_RECEIVED]: (state) => ({ ...state }),
  [WEB_SOCKET_ACTION_TYPES.MESSAGE_RECEIVED]: (state) => ({ ...state }),
  [WEB_SOCKET_ACTION_TYPES.SEND_MESSAGE]: (state) => ({ ...state }),
  [WEB_SOCKET_ACTION_TYPES.SET_SOCKET_ID]: (state, { data }) => ({ ...state, socketId: data.socketId })
}

export const webSocketReducer = (prevState: WebSocketState, action: StoreAction<WEB_SOCKET_ACTION_TYPES>): WebSocketState => {
  const state = prevState || initialState

  if (action && reactions[action.type]) {
    return reactions[action.type](state, action)
  }

  return { ...state }
}
