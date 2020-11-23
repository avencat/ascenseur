export enum WEB_SOCKET_ACTION {
  BET_SET = 'BET_SET',
  CARD_PLAYED = 'CARD_PLAYED',
  CONNECTED = 'CONNECTED',
  DEAL_CARDS = 'DEAL_CARDS',
  END_GAME = 'END_GAME',
  ERROR = 'ERROR',
  GAME_FULL = 'GAME_FULL',
  GAME_INIT = 'GAME_INIT',
  GAME_JOINED = 'GAME_JOINED',
  GAMES_LIST = 'GAMES_LIST',
  GAME_STARTED = 'GAME_STARTED',
  INIT_GAME = 'INIT_GAME',
  JOIN_GAME = 'JOIN_GAME',
  LIST_GAMES = 'LIST_GAMES',
  NOT_FOUND = 'NOT_FOUND',
  PLAY_CARD = 'PLAY_CARD',
  SET_BET = 'SET_BET',
  SET_CARDS = 'SET_CARDS',
  SET_GAME_ROUND = 'SET_GAME_ROUND',
  SET_PLAYER_POSITION = 'SET_PLAYER_POSITION',
  SET_PLAYERS = 'SET_PLAYERS',
  SET_SCORE = 'SET_SCORE',
  SET_TURN = 'SET_TURN',
  SET_TURN_WINNER = 'SET_TURN_WINNER',
  SHOULD_PLAY_CARD = 'SHOULD_PLAY_CARD',
  SHOULD_SET_BET = 'SHOULD_SET_BET',
  START_GAME = 'START_GAME',
  SUCCESS = 'SUCCESS',
  WELCOME = 'WELCOME'
}

/* eslint-disable camelcase */
export type Message = {
  connect_to: string[]
} | {
  send_packet: { to: string, message: any }
} | {
  from: string
  message: any
  to: string
}
/* eslint-enable camelcase */

export interface ServerMessage {
  from: string
  message: {
    action: WEB_SOCKET_ACTION
    data: any
    message?: string
  }
  to: string
}

/* global Blob */
export type WebSocketData = string | ArrayBuffer | Blob | ArrayBufferView
