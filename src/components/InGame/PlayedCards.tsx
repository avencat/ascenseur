import { connect } from 'react-redux'
import React, { memo, useCallback } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import PlayedCardComponent from './PlayedCard'
import { GlobalState, PlayedCard } from '../../interfaces'

interface StateProps {
  playedCards: PlayedCard[]
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  playedCards: state.game.oldPlayedCards.length
    ? state.game.oldPlayedCards
    : state.game.playedCards
})

const InGamePlayedCards = connect(mapStateToProps)(memo<Props>(({
  playedCards
}) => {
  const renderPlayedCard = useCallback(({ item }: { item: PlayedCard }) => (
    <PlayedCardComponent {...item} />
  ), [])

  return (
    <>
      <Text style={styles.title}>Cartes jouées :</Text>

      <FlatList
        keyExtractor={item => `${item.card._id}-${item.player._id}`}
        data={playedCards}
        horizontal
        renderItem={renderPlayedCard}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}))

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10
  },

  title: {
    marginBottom: 10,
    marginHorizontal: 15
  }
})

export default InGamePlayedCards
