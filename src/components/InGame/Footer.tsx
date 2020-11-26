import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  Button,
  FlatList,
  Platform,
  PlatformColor,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Card from '../Card'
import EndTurn from './EndTurn'
import TurnSentence from './TurnSentence'
import { TURN_ACTION } from '../../constants/turn_action'
import { convertPlayerCardToCard, sortCards } from '../../utils'
import { playCard, setBet as validateBet } from '../../redux/actions'
import {
  GlobalState,
  PlayedCard,
  Player,
  PlayerCard,
  SERVER_CARD_COLOR
} from '../../interfaces'

interface DispatchProps {
  playCard(id: string): void
  validateBet(bet: number): void
}

interface StateProps {
  assetColor?: SERVER_CARD_COLOR
  cards: PlayerCard[]
  cardsDealt?: number
  color?: SERVER_CARD_COLOR
  currentPlayerTurn?: Player
  isMyTurn: boolean
  me?: Player
  oldPlayedCards: PlayedCard[]
  turnAction: TURN_ACTION
}

type Props = DispatchProps & StateProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  playCard: (id: string) => dispatch(playCard(id)),
  validateBet: (bet: number) => dispatch(validateBet(bet))
})

const mapStateToProps = (state: GlobalState): StateProps => ({
  assetColor: state.game.round?.asset,
  cards: state.game.hand,
  cardsDealt: state.game.round?.cardsDealt,
  color: state.game.color,
  currentPlayerTurn: state.game.currentPlayerTurn,
  isMyTurn: state.game.currentPlayerTurn?._id === state.game.player?._id,
  me: state.game.player,
  oldPlayedCards: state.game.oldPlayedCards,
  turnAction: state.game.turnAction
})

const InGameFooter = connect(mapStateToProps, mapDispatchToProps)(memo<Props>(({
  assetColor,
  cards,
  cardsDealt,
  color,
  isMyTurn,
  me,
  oldPlayedCards,
  playCard,
  validateBet
}) => {
  const [bet, setBet] = useState<number>(0)
  const [card, setCard] = useState<string>()
  const [minify, setMinify] = useState<boolean>(false)

  const hasSetBet = useMemo(() => typeof me?.bet === 'number', [me])
  const styles = useMemo(() => StyleSheetCreator(minify), [minify])

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

  const toggleMinify = useCallback(() => {
    setMinify(!minify)
  }, [minify])

  const renderCard = useCallback(({ item }: { item: PlayerCard }) => {
    const cardItem = convertPlayerCardToCard(item)

    return (
      <Card
        {...cardItem}
        onPress={hasSetBet ? selectCard(item._id) : undefined}
        selected={card === item._id}
        style={minify ? styles.singleCard : undefined}
      />
    )
  }, [card, hasSetBet, minify])
  const renderSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), [])

  if (oldPlayedCards.length) {
    return <EndTurn />
  }

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {`Mes cartes (${cards.length}) :`}
        </Text>

        {cards.length > 3 && (
          <TouchableOpacity onPress={toggleMinify}>
            <Text style={styles.minify}>
              {minify ? 'Espacer' : 'Minifier'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        keyExtractor={item => item._id}
        data={sortCards(cards, color, assetColor)}
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
      <TurnSentence />
    </>
  )
}))

const StyleSheetCreator = (isMinified: boolean) => StyleSheet.create({
  buttonContainer: {
    alignItems: 'center'
  },

  buttonControllerContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  flatListContent: {
    paddingLeft: isMinified ? 120 : 15,
    paddingRight: 15
  },

  minify: {
    ...Platform.select({
      ios: {
        color: PlatformColor('link')
      },
      android: {
        color: PlatformColor('?attr/autoLink')
      },
      default: { color: 'blue' }
    }),
    marginBottom: 10,
    marginHorizontal: 15
  },

  separator: {
    width: 10
  },

  singleCard: {
    marginLeft: isMinified ? -105 : undefined
  },

  title: {
    marginBottom: 10,
    marginHorizontal: 15
  },

  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default InGameFooter
