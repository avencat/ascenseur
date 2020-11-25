import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import {
  Button,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Card from '../Card'
import PlayedCardComponent from './PlayedCard'
import { removeOldPlayedCards } from '../../redux/actions'
import {
  convertServerCardColorToCardColor,
  GlobalState,
  PlayedCard,
  Player,
  SERVER_CARD_COLOR
} from '../../interfaces'

interface DispatchProps {
  removeOldPlayedCards(): void
}

interface StateProps {
  isMyTurn?: boolean
  me?: Player
  oldAssetColor?: SERVER_CARD_COLOR
  oldAssetNumber?: number
  oldPlayedCards: PlayedCard[]
  turnWinner?: Player
  winner?: Player
}

type Props = DispatchProps & StateProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  removeOldPlayedCards: () => dispatch(removeOldPlayedCards())
})

const mapStateToProps = (state: GlobalState): StateProps => ({
  isMyTurn: state.game.currentPlayerTurn?._id === state.game.player?._id,
  me: state.game.player,
  oldAssetColor: state.game.oldAssetColor,
  oldAssetNumber: state.game.oldAssetNumber,
  oldPlayedCards: state.game.oldPlayedCards,
  turnWinner: state.game.turnWinner,
  winner: state.game.winner
})

const EndTurnModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(memo<Props>(({
  isMyTurn,
  me,
  oldAssetColor,
  oldAssetNumber,
  oldPlayedCards,
  removeOldPlayedCards,
  turnWinner,
  winner
}) => {
  const renderPlayedCard = useCallback(({ item }: { item: PlayedCard }) => (
    <PlayedCardComponent
      {...item}
      width={Dimensions.get('window').width / 3.5}
    />
  ), [])

  const removeOldPlayedCardsCallback = useCallback(() => {
    removeOldPlayedCards()
  }, [])

  const isMe = useMemo(() => me?._id === turnWinner?._id, [turnWinner, me])

  return (
    <Modal visible={!!(!winner && oldPlayedCards.length)}>
      <SafeAreaView style={styles.assetContainer}>
        <View>
          <Text style={styles.assetTitle}>
            Atout :
          </Text>
          {!!(oldAssetNumber && oldAssetColor) && (
            <Card
              color={convertServerCardColorToCardColor(oldAssetColor)}
              identifier={`${oldAssetColor}-${oldAssetNumber}`}
              number={oldAssetNumber}
              value={oldAssetNumber}
              width={Math.min(Math.floor((Dimensions.get('window').width - 30) / 4), 120)}
            />
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          {isMe
            ? 'Vous avez remporté le pli'
            : `${turnWinner?.name} a remporté le pli`
          }
        </Text>
        <FlatList
          bounces={false}
          keyExtractor={item => `${item.card._id}-${item.player._id}`}
          data={oldPlayedCards}
          numColumns={3}
          renderItem={renderPlayedCard}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
        <Button title='Continuer' onPress={removeOldPlayedCardsCallback} />
        {!!isMyTurn && (
          <Text style={styles.danger}>C'est à vous de jouer !!!</Text>
        )}
      </SafeAreaView>
    </Modal>
  )
}))

const styles = StyleSheet.create({
  assetContainer: {
    alignItems: 'flex-end',
    marginRight: 20
  },

  assetTitle: {
    marginBottom: 5
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -100
  },

  contentContainer: {
    paddingHorizontal: 10
  },

  danger: {
    color: 'red',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },

  flatList: {
    flexGrow: 0,
    marginVertical: 50
  },

  title: {
    fontSize: 25,
    marginHorizontal: 15,
    textAlign: 'center'
  }
})

export default EndTurnModal
