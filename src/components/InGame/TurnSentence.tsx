import React, { memo } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native'

import { GlobalState, Player } from '../../interfaces'
import { TURN_ACTION } from '../../constants/turn_action'

interface StateProps {
  currentPlayerTurn?: Player
  isMyTurn?: boolean
  turnAction: TURN_ACTION
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  currentPlayerTurn: state.game.currentPlayerTurn,
  isMyTurn: state.game.currentPlayerTurn?._id === state.game.player?._id,
  turnAction: state.game.turnAction
})

const TurnSentence = connect(mapStateToProps)(memo<Props>(({
  currentPlayerTurn,
  isMyTurn,
  turnAction
}) => {
  return (
    <Text style={styles.comment}>
      {`C'est ${
        !isMyTurn ? `au tour de ${currentPlayerTurn?.name}` : 'à mon tour'
      } de ${
        turnAction === TURN_ACTION.BET ? `valider le contrat.` : 'jouer.'
      }`}
    </Text>
  )
}))

const styles = StyleSheet.create({
  comment: {
    marginHorizontal: 15,
    marginVertical: 20,
    textAlign: 'center'
  }
})

export default TurnSentence
