import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Card from '../Card'
import { convertServerCardToCard } from '../../utils'
import { PlayedCard as PlayedCardInterface } from '../../interfaces'

interface Props extends PlayedCardInterface {
  width?: number
}

const PlayedCard = memo<Props>(({
  card: serverCard,
  player,
  width
}) => {
  const card = convertServerCardToCard(serverCard)

  return (
    <View style={styles.cardContainer}>
      <Text>{player.name}</Text>
      <Card {...card} width={width} />
    </View>
  )
})

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5
  }
})

export default PlayedCard
