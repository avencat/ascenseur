import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { isCardRed } from '../utils'
import { Card as CardInterface, CardColor, CardNumber } from '../interfaces'

import CardContent from './CardContent'

const Card = memo<CardInterface>(({ color, number, value }) => {
  const styles = useMemo(() => StyleSheetCreator(color), [color]);

  return (
    <View style={styles.container}>
      <CardContent color={color} value={value} />

      <View style={styles.topLeftContainer}>
        <Text style={styles.number}>{`${CardNumber[number - 1]}`}</Text>

        <Text style={styles.text}>{`${color}`}</Text>
      </View>

      <View style={styles.bottomRightContainer}>
        <Text style={styles.number}>{`${CardNumber[number - 1]}`}</Text>

        <Text style={styles.text}>{`${color}`}</Text>
      </View>
    </View>
  )
})

const StyleSheetCreator = (color: CardColor) => (
  StyleSheet.create({
    bottomRightContainer: {
      alignItems: 'center',
      bottom: 6,
      position: 'absolute',
      right: 6,
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
      color: isCardRed(color) ? 'red' : 'black',
      fontSize: 12
    },

    text: {
      fontSize: 10
    },

    topLeftContainer: {
      alignItems: 'center',
      left: 6,
      position: 'absolute',
      top: 6
    }
  })
)

export default Card
