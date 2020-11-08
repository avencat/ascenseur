import React, { memo, useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { Card as CardInterface, CardColor, isCardRed } from '../utils'

const Card = memo<CardInterface>(({ color, number, value }) => {
  const styles = useMemo(() => StyleSheetCreator(color), [color]);

  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.number}>{`${number}`}</Text>

        <Text>{`${color}`}</Text>
      </View>

      <View style={styles.bottomRightContainer}>
        <Text style={styles.number}>{`${number}`}</Text>

        <Text>{`${color}`}</Text>
      </View>
    </View>
  )
})

const StyleSheetCreator = (color: CardColor) => (
  StyleSheet.create({
    bottomRightContainer: {
      alignItems: 'center',
      bottom: 10,
      position: 'absolute',
      right: 10,
      transform: [{
        rotate: '180deg'
      }]
    },

    container: {
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2,
      height: 170,
      width: 120
    },

    number: {
      color: isCardRed(color) ? 'red' : 'black'
    },

    topLeftContainer: {
      alignItems: 'center',
      left: 10,
      position: 'absolute',
      top: 10
    }
  })
)

export default Card
