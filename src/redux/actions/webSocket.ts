import { Message, WebSocketData } from '../../interfaces'

export enum WEB_SOCKET_ACTION_TYPES {
  CONNECTED = 'WEB_SOCKET_CONNECTED',
  DISCONNECTED = 'WEB_SOCKET_DISCONNECTED',
  INVALID_MESSAGE_RECEIVED = 'WEB_SOCKET_INVALID_MESSAGE_RECEIVED',
  MESSAGE_RECEIVED = 'WEB_SOCKET_MESSAGE_RECEIVED',
  SEND_MESSAGE = 'WEB_SOCKET_SEND_MESSAGE',
  SET_SOCKET_ID = 'SET_SOCKET_ID'
}

export enum WEB_SOCKET_CHANNEL {
  LOBBY = 'lobby'
}

export const invalidMessageReceived = (message: WebSocketData) => ({
  data: { message },
  type: WEB_SOCKET_ACTION_TYPES.INVALID_MESSAGE_RECEIVED
})

export const messageReceived = (message: Message) => ({
  data: { message },
  type: WEB_SOCKET_ACTION_TYPES.MESSAGE_RECEIVED
})

export const sendMessage = (message: Message) => ({
  data: { message },
  type: WEB_SOCKET_ACTION_TYPES.SEND_MESSAGE
})

export const setSocketId = (socketId: number) => ({
  data: { socketId },
  type: WEB_SOCKET_ACTION_TYPES.SET_SOCKET_ID
})
