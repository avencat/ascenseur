export enum WEB_SOCKET_ACTION {
  CONNECTED = 'CONNECTED',
  INIT_GAME = 'INIT_GAME',
  NOT_FOUND = 'NOT_FOUND',
  SUCCESS = 'SUCCESS'
}

/* eslint-disable camelcase */
export type Message = {
  connect_to: string[]
} | {
  send_packet: { to: string, message: string }
} | {
  from: string
  message: string
  to: string
}
/* eslint-enable camelcase */

/* global Blob */
export type WebSocketData = string | ArrayBuffer | Blob | ArrayBufferView
