import { connect } from 'react-redux'
import React, { memo, useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Card from '../Card'
import { convertServerCardToCard } from '../../utils'
import { GlobalState, PlayedCard } from '../../interfaces'

interface StateProps {
  playedCards: PlayedCard[]
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  playedCards: state.game.playedCards
})

const InGamePlayedCards = connect(mapStateToProps)(memo<Props>(({
  playedCards
}) => {
  const renderPlayedCard = useCallback(({ item }: { item: PlayedCard }) => {
    const card = convertServerCardToCard(item.card)

    return (
      <View style={styles.cardContainer}>
        <Text>{item.player.name}</Text>
        <Card {...card} />
      </View>
    )
  }, [])

  return (
    <>
      <Text style={styles.title}>Cartes jouées :</Text>
      <FlatList
        keyExtractor={item => `${item.card._id}-${item.player._id}`}
        data={playedCards}
        horizontal
        renderItem={renderPlayedCard}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  )
}))

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5
  },

  contentContainer: {
    paddingHorizontal: 10
  },

  title: {
    marginBottom: 10,
    marginHorizontal: 15
  }
})

export default InGamePlayedCards
