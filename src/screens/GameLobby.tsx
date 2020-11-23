import React, { memo, useCallback } from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  FlatList, Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Game, GlobalState, Player } from '../interfaces'

interface StateProps {
  game: Game
  player: Player
  gamePlayers: Player[]
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  game: state.game.game!,
  player: state.game.player!,
  gamePlayers: state.game.players
})

const GameLobby = connect(mapStateToProps)(memo<Props>(({ game, gamePlayers, player }: Props) => {
  const renderPlayer = useCallback(({ item }: { item: Player }) => (
    <View style={styles.playerContainer}>
      <Text style={styles.title}>
        {`${item.name}${item._id === player._id ? ' (moi)' : ''}`}
      </Text>
      <Text>{`Identifiant : ${item._id}`}</Text>
      <Text>{`Score : ${item.score}`}</Text>
      <Text>{`Socket : ${item.socketId}`}</Text>
    </View>
  ), [player])

  return (
    <SafeAreaView>
      <View style={styles.gameContainer}>
        <Text style={styles.title}>PARTIE</Text>
        <Text>{`Nom : ${game.name}`}</Text>
        <Text>{`Identifiant : ${game._id}`}</Text>
        <Text>{`Places libres : ${game.nbPlayers - gamePlayers.length}`}</Text>
      </View>
      <FlatList
        keyExtractor={item => item._id}
        data={gamePlayers}
        renderItem={renderPlayer}
        style={styles.playersContainer}
      />
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator color={Platform.OS === 'android' ? 'grey' : undefined} />
        <Text style={styles.activityIndicatorText}>En attente d'autres joueurs...</Text>
      </View>
    </SafeAreaView>
  )
}))

const styles = StyleSheet.create({
  activityIndicatorText: {
    marginLeft: 10
  },

  activityIndicatorView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },

  gameContainer: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 3,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  playerContainer: {
    marginVertical: 10
  },

  playersContainer: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 3,
    borderWidth: 1,
    marginHorizontal: 15,
    paddingHorizontal: 15
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 10
  }
})

export default GameLobby
