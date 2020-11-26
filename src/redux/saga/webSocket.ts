import { Alert } from 'react-native'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  Game,
  GlobalState,
  ServerMessage,
  TypedStoreAction,
  WEB_SOCKET_ACTION,
  WebSocketData
} from '../../interfaces'

import { ROUTE_NAMES } from '../../navigation/main'
import { navigate } from '../../navigation/NavigationActions'
import { formatConnectMessage } from '../../utils/webSocket'
import {
  cardPlayed,
  endGame,
  gameFull,
  gameInit,
  gameJoined,
  gamesList,
  listGames,
  sendMessage,
  setBetForPlayer,
  setCardColor,
  setGame,
  setGameRound,
  setGameWithGameId,
  setHand,
  setPlayer,
  setPlayers,
  setScore,
  setSocketId,
  setTurn,
  setTurnWinner,
  shouldPlayCard,
  shouldSetBet,
  WEB_SOCKET_ACTION_TYPES,
  WEB_SOCKET_CHANNEL
} from '../actions'

function * connectedSaga () {
  yield put(sendMessage(formatConnectMessage(WEB_SOCKET_CHANNEL.LOBBY)))
}

function * messageReceivedSaga ({
  data: { message }
}: TypedStoreAction<
  WEB_SOCKET_ACTION_TYPES.MESSAGE_RECEIVED,
  { message: ServerMessage }
>) {
  console.log(message)
  const {
    from, // eslint-disable-line
    message: { action, data, message: messageMessage },
    to
  } = message

  switch (action) {
    case WEB_SOCKET_ACTION.GAMES_LIST:
      yield put(gamesList(data as Game[]))
      break

    case WEB_SOCKET_ACTION.ERROR:
      Alert.alert(WEB_SOCKET_ACTION.ERROR, messageMessage)
      break

    case WEB_SOCKET_ACTION.GAME_INIT:
      if (data?.player && data?.game) {
        yield put(setGame(data.game))
        yield put(setPlayer(data.player))
        yield call(navigate, ROUTE_NAMES.GAME_LOBBY)
      } else {
        yield put(gameInit(data))
      }
      break

    case WEB_SOCKET_ACTION.GAME_JOINED:
      const socketId = yield select( //eslint-disable-line
        (state: GlobalState) => state.webSocket.socketId
      )

      if (socketId === data.socketId) {
        yield put(setPlayer(data))
        yield put(setGameWithGameId(to))
        yield call(navigate, ROUTE_NAMES.GAME_LOBBY)
      }

      yield put(gameJoined({ gameId: to, player: data }))
      break

    case WEB_SOCKET_ACTION.SET_GAME_ROUND:
      yield put(setGameRound(data))
      break

    case WEB_SOCKET_ACTION.SET_PLAYERS:
    case WEB_SOCKET_ACTION.SET_PLAYER_POSITION:
      yield put(setPlayers(data))
      break

    case WEB_SOCKET_ACTION.GAME_STARTED:
      yield call(navigate, ROUTE_NAMES.IN_GAME)
      break

    case WEB_SOCKET_ACTION.GAME_FULL:
      yield put(gameFull(data))
      break

    case WEB_SOCKET_ACTION.WELCOME:
      yield put(setSocketId(data))
      break

    case WEB_SOCKET_ACTION.SET_CARDS:
      yield put(setHand(data))
      break

    case WEB_SOCKET_ACTION.SET_TURN:
      yield put(setTurn(data))
      break

    case WEB_SOCKET_ACTION.BET_SET:
      yield put(setBetForPlayer(data))
      break

    case WEB_SOCKET_ACTION.CARD_PLAYED:
      yield put(cardPlayed(data))
      break

    case WEB_SOCKET_ACTION.SET_CARD_COLOR:
      yield put(setCardColor(data))
      break

    case WEB_SOCKET_ACTION.SET_SCORE:
      yield put(setScore(data))
      break

    case WEB_SOCKET_ACTION.SET_TURN_WINNER:
      yield put(setTurnWinner(data))
      break

    case WEB_SOCKET_ACTION.SHOULD_SET_BET:
      yield put(shouldSetBet(data))
      break

    case WEB_SOCKET_ACTION.SHOULD_PLAY_CARD:
      yield put(shouldPlayCard(data))
      break

    case WEB_SOCKET_ACTION.END_GAME:
      yield put(endGame(data))
      break

    default:
      console.log(`NOT_HANDLED: ${action}`)
      break
  }
}

function * invalidMessageReceivedSaga ({
  data: { message }
}: TypedStoreAction<
  WEB_SOCKET_ACTION_TYPES.INVALID_MESSAGE_RECEIVED,
  { message: WebSocketData }
>) {
  console.log(message)

  if (message === `Connected to ${WEB_SOCKET_CHANNEL.LOBBY}.`) {
    yield put(listGames())
  }
}

export function * webSocketSaga () {
  yield takeEvery(
    WEB_SOCKET_ACTION_TYPES.CONNECTED,
    connectedSaga
  )

  yield takeEvery(
    WEB_SOCKET_ACTION_TYPES.MESSAGE_RECEIVED,
    messageReceivedSaga
  )

  yield takeEvery(
    WEB_SOCKET_ACTION_TYPES.INVALID_MESSAGE_RECEIVED,
    invalidMessageReceivedSaga
  )
}
