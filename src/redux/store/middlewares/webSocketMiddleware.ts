import { MiddlewareAPI } from 'redux'
import { TypeSocket } from 'typesocket'
import { Alert, Platform } from 'react-native'

import { Message } from '../../../interfaces'
import { WS_URL } from '../../../constants/env'
import {
  invalidMessageReceived,
  messageReceived,
  WEB_SOCKET_ACTION_TYPES
} from '../../actions'

export const webSocketMiddleware = (url: string) => {
  return (store: MiddlewareAPI<any, any>) => {
    const socket = new TypeSocket<Message>(url)
    let hasConnected = false

    // We dispatch the actions for further handling here:
    socket.on('connected', () => {
      hasConnected = true
      console.log('connected')
      return store.dispatch({ type: WEB_SOCKET_ACTION_TYPES.CONNECTED })
    })
    socket.on('disconnected', () => {
      if (!hasConnected) {
        return
      }
      console.log('disconnected')
      if (Platform.OS === 'web') {
        alert(`Veuillez relancer l'app s'il-vous-plaît.\n${WS_URL}`)
      } else {
        Alert.alert(
          'Un problème est survenu',
          `Veuillez relancer l'app s'il-vous-plaît.\n${WS_URL}`
        )
      }
      return store.dispatch({ type: WEB_SOCKET_ACTION_TYPES.DISCONNECTED })
    })
    socket.on(
      'message',
      (message) =>
        store.dispatch(messageReceived(message))
    )
    socket.on(
      'invalidMessage',
      (message) =>
        store.dispatch(invalidMessageReceived(message))
    )
    socket.connect()

    return (next: (action: any) => void) => (action: any) => {
      // We're acting on an action with type of SEND_MESSAGE.
      // Don't forget to check if the socket is in readyState == 1.
      // Other readyStates may result in an exception being thrown.
      if (action.type && action.type === WEB_SOCKET_ACTION_TYPES.SEND_MESSAGE) {
        if (socket.readyState === 1) {
          console.log('send message', action.data.message)
          socket.send(action.data.message)
        } else {
          socket.connect()
        }
      }

      return next(action)
    }
  }
}
