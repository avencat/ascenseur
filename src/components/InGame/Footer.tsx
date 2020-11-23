import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import Card from '../Card'
import { convertPlayerCardToCard } from '../../utils'
import { TURN_ACTION } from '../../constants/turn_action'
import { GlobalState, Player, PlayerCard } from '../../interfaces'
import { playCard, setBet as validateBet } from '../../redux/actions'

interface DispatchProps {
  playCard(id: string): void
  validateBet(bet: number): void
}

interface StateProps {
  cards: PlayerCard[]
  cardsDealt?: number
  currentPlayerTurn?: Player
  isMyTurn: boolean
  me?: Player
  turnAction: TURN_ACTION
}

type Props = DispatchProps & StateProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  playCard: (id: string) => dispatch(playCard(id)),
  validateBet: (bet: number) => dispatch(validateBet(bet))
})

const mapStateToProps = (state: GlobalState): StateProps => ({
  cards: state.game.hand,
  cardsDealt: state.game.round?.cardsDealt,
  currentPlayerTurn: state.game.currentPlayerTurn,
  isMyTurn: state.game.currentPlayerTurn?._id === state.game.player?._id,
  me: state.game.player,
  turnAction: state.game.turnAction
})

const InGameFooter = connect(mapStateToProps, mapDispatchToProps)(memo<Props>(({
  cards,
  cardsDealt,
  currentPlayerTurn,
  isMyTurn,
  me,
  playCard,
  turnAction,
  validateBet
}) => {
  const [bet, setBet] = useState<number>(0)
  const [card, setCard] = useState<string>()

  const hasSetBet = useMemo(() => typeof me?.bet === 'number', [me])

  const increaseBet = useCallback(() => {
    setBet(Math.min(cardsDealt || 0, bet + 1))
  }, [bet, cardsDealt])
  const decreaseBet = useCallback(() => {
    setBet(Math.max(0, bet - 1))
  }, [bet])

  const validateBetCallback = useCallback(() => {
    validateBet(bet)
  }, [bet])
  const playCardCallback = useCallback(() => {
    if (card) {
      playCard(card)
      setCard(undefined)
    }
  }, [card])
  const selectCard = useCallback((cardId: string) => () => {
    if (card === cardId) {
      setCard(undefined)
    } else {
      setCard(cardId)
    }
  }, [card])

  const renderCard = useCallback(({ item }: { item: PlayerCard }) => {
    const cardItem = convertPlayerCardToCard(item)

    return (
      <Card
        {...cardItem}
        onPress={hasSetBet ? selectCard(item._id) : undefined}
        selected={card === item._id}
      />
    )
  }, [card, hasSetBet])
  const renderSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), [])

  return (
    <>
      <Text style={styles.title}>
        Mes cartes :
      </Text>
      <FlatList
        keyExtractor={item => item._id}
        data={cards}
        horizontal
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      {!hasSetBet && isMyTurn && (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonControllerContainer}>
            <Button title='-' onPress={decreaseBet} />
            <Text>{bet}</Text>
            <Button title='+' onPress={increaseBet} />
          </View>
          <Button title='Valider le contrat' onPress={validateBetCallback} />
        </View>
      )}
      {!!card && isMyTurn && (
        <Button title='Valider la carte' onPress={playCardCallback} />
      )}
      <Text style={styles.comment}>
        {`C'est ${
          !isMyTurn ? `au tour de ${currentPlayerTurn?.name}` : 'à mon tour'
        } de ${
          turnAction === TURN_ACTION.BET ? `valider le contrat.` : 'jouer.'
        }`}
      </Text>
    </>
  )
}))

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center'
  },

  buttonControllerContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  comment: {
    marginHorizontal: 15,
    marginVertical: 20,
    textAlign: 'center'
  },

  flatListContent: {
    paddingHorizontal: 15
  },

  separator: {
    width: 10
  },

  title: {
    marginBottom: 10,
    marginHorizontal: 15
  }
})

export default InGameFooter
