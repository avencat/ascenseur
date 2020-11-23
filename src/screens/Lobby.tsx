import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import React, { memo, useCallback, useEffect, useState } from 'react'
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View,
} from 'react-native'

import { Game, GlobalState } from '../interfaces'
import { initGame, joinGame, listGames } from '../redux/actions'

interface DispatchProps {
  initGame(nbPlayers: number, name: string): void
  joinGame(game: string, name: string): void
  listGames(): void
}

interface StateProps {
  games: Game[]
}

type Props = DispatchProps & StateProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  initGame: (nbPlayers, name) => dispatch(
    initGame({ name, nbPlayers })
  ),
  joinGame: (game, name) => dispatch(joinGame(game, name)),
  listGames: () => dispatch(listGames())
})

const mapStateToProps = (state: GlobalState): StateProps => ({
  games: state.game.games
})

const Lobby = connect(mapStateToProps, mapDispatchToProps)(memo<Props>(({
  games,
  initGame,
  joinGame,
  listGames
}) => {
  const [gameSelected, setGameSelected] = useState<string>()
  const [name, setName] = useState<string>()
  const [nbPlayers, setNbPlayers] = useState<number>(3)
  useEffect(() => {
    setTimeout(() => {
      listGames()
    }, 100)
  }, [])

  const onChangeText = useCallback((text: string) => setName(text), [setName])
  const initGameCallback = useCallback(() => {
    if (name) {
      initGame(nbPlayers, name)
    }
  }, [initGame, name, nbPlayers])
  const joinGameCallback = useCallback(() => {
    if (gameSelected && name) {
      joinGame(gameSelected, name)
    }
  }, [gameSelected, name])
  const setGameSelectedCallback = useCallback((id: string) => () => {
    setGameSelected(id)
  }, [setGameSelected])
  const renderGame = useCallback(({ item }: { item: Game }) => {
    return (
      <TouchableOpacity
        onPress={setGameSelectedCallback(item._id)}
        style={styles.game}
      >
        {
          gameSelected === item._id
            ? <Text style={styles.gameName}>[x]</Text>
            : <Text style={styles.gameName}>[  ]</Text>
        }
        <Text style={styles.gameName}>
          {`${
            item.name || item._id
          } (${
            item._id.substring(item._id.length - 4)
          }) - ${
            item.nbPlayers
          } joueurs`}
        </Text>
      </TouchableOpacity>
    )
  }, [gameSelected])

  const increaseNbPlayers = useCallback(() => {
    setNbPlayers(Math.min(nbPlayers + 1, 10))
  }, [nbPlayers])

  const decreaseNbPlayers = useCallback(() => {
    setNbPlayers(Math.max(nbPlayers - 1, 3))
  }, [nbPlayers])

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item: Game) => item?._id}
        data={games}
        renderItem={renderGame}
        style={styles.gamesContainer}
        contentContainerStyle={styles.gamesContentContainer}
      />
      <TextInput
        onChangeText={onChangeText}
        placeholder="Nom d'utilisateur"
        style={styles.textInput}
      />
      <View style={styles.button}>
        <Button title='Rejoindre une partie' onPress={joinGameCallback} />
      </View>
      <View style={styles.nbPlayersContainer}>
        <Text style={styles.nbPlayersTitle}>Nombre de joueurs</Text>
        <View style={styles.nbPlayersButtonContainer}>
          <Button title='-' onPress={decreaseNbPlayers} />
          <Text style={styles.nbPlayers}>{nbPlayers}</Text>
          <Button title='+' onPress={increaseNbPlayers} />
        </View>
      </View>
      <View style={styles.button}>
        <Button title='Créer une partie' onPress={initGameCallback} />
      </View>
    </SafeAreaView>
  )
}))

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
    marginTop: 10
  },

  game: {
    flexDirection: 'row',
    marginBottom: 5
  },

  gameName: {
    paddingLeft: 5
  },

  gamesContainer: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 3,
    borderWidth: 1,
    height: 150,
    marginHorizontal: 15,
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  gamesContentContainer: {
    paddingBottom: 20
  },

  nbPlayers: {
    marginHorizontal: 10
  },

  nbPlayersButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  nbPlayersContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 10
  },

  nbPlayersTitle: {
    marginBottom: 10
  },

  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  }
})

export default Lobby
