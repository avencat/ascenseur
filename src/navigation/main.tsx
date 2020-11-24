import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Lobby from '../screens/Lobby'
import InGame from '../screens/InGame'
import GameLobby from '../screens/GameLobby'

// @XXX: Interfaces won't work
export type MainStackParamList = {
  [ROUTE_NAMES.LOBBY]: undefined
  [ROUTE_NAMES.GAME_LOBBY]: undefined
  [ROUTE_NAMES.IN_GAME]: undefined
}

const Stack = createStackNavigator<MainStackParamList>();

export enum ROUTE_NAMES {
  LOBBY = 'Lobby',
  GAME_LOBBY = 'GameLobby',
  IN_GAME = 'InGame'
}

const MainNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTE_NAMES.LOBBY}>
    <Stack.Screen name={ROUTE_NAMES.LOBBY} component={Lobby} />

    <Stack.Screen name={ROUTE_NAMES.GAME_LOBBY} component={GameLobby} />

    <Stack.Screen
      name={ROUTE_NAMES.IN_GAME}
      component={InGame}
      options={{ gestureEnabled: false, headerShown: false }}
    />
  </Stack.Navigator>
)

export default MainNavigator
