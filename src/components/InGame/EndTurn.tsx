import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { Button, StyleSheet, Text } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'

import TurnSentence from './TurnSentence'
import { GlobalState, Player } from '../../interfaces'
import { removeOldPlayedCards } from '../../redux/actions'

interface DispatchProps {
  removeOldPlayedCards(): void
}

interface StateProps {
  isMyTurn?: boolean
  me?: Player
  turnWinner?: Player
}

type Props = DispatchProps & StateProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  removeOldPlayedCards: () => dispatch(removeOldPlayedCards())
})

const mapStateToProps = (state: GlobalState): StateProps => ({
  isMyTurn: state.game.currentPlayerTurn?._id === state.game.player?._id,
  me: state.game.player,
  turnWinner: state.game.turnWinner
})

const EndTurn = connect(
  mapStateToProps,
  mapDispatchToProps
)(memo<Props>(({
  isMyTurn,
  me,
  removeOldPlayedCards,
  turnWinner
}) => {
  const removeOldPlayedCardsCallback = useCallback(() => {
    removeOldPlayedCards()
  }, [])

  const isMe = useMemo(() => me?._id === turnWinner?._id, [turnWinner, me])

  return (
    <>
      <Text style={styles.title}>
        {isMe
          ? 'Vous avez remporté le pli'
          : `${turnWinner?.name} a remporté le pli`
        }
      </Text>

      <Button title='Continuer' onPress={removeOldPlayedCardsCallback} />

      {!!isMyTurn && (
        <Text style={styles.danger}>C'est à vous de jouer !!!</Text>
      )}

      <TurnSentence />
    </>
  )
}))

const styles = StyleSheet.create({
  danger: {
    color: 'red',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },

  title: {
    fontSize: 25,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center'
  }
})

export default EndTurn
