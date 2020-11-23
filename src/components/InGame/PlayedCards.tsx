import { connect } from 'react-redux'
import React, { memo, useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'

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
      <View>
        <Text>{item.player.name}</Text>
        <Card {...card} />
      </View>
    )
  }, [])

  return (
    <>
      <Text>Cartes jouées :</Text>
      <FlatList
        keyExtractor={item => `${item.card._id}-${item.player._id}`}
        data={playedCards}
        horizontal
        renderItem={renderPlayedCard}
      />
    </>
  )
}))

export default InGamePlayedCards
