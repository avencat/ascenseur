import React, { memo, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { isCardRed } from '../utils'
import { Card as CardInterface, CARD_COLOR, CardNumber } from '../interfaces'

import CardContent from './CardContent'

interface Props extends CardInterface {
  onPress?(): void
  selected?: boolean
  style?: ViewStyle
  width?: number
}

const Card = memo<Props>(({
  color,
  number,
  onPress,
  selected,
  style,
  value,
  width
}) => {
  const styles = useMemo(() => StyleSheetCreator(color, width), [color]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, selected && styles.selectedContainer, style]}
    >
      <CardContent color={color} value={value} width={width} />

      <View style={styles.topLeftContainer}>
        <Text style={styles.number}>{`${CardNumber[number - 1]}`}</Text>

        <Text style={styles.text}>{`${color}`}</Text>
      </View>

      <View style={styles.bottomRightContainer}>
        <Text style={styles.number}>{`${CardNumber[number - 1]}`}</Text>

        <Text style={styles.text}>{`${color}`}</Text>
      </View>
    </TouchableOpacity>
  )
})

const StyleSheetCreator = (color: CARD_COLOR, width = 120) => (
  StyleSheet.create({
    bottomRightContainer: {
      alignItems: 'center',
      bottom: Math.floor(6 / 120 * width),
      position: 'absolute',
      right: Math.floor(6 / 120 * width),
      transform: [{
        rotate: '180deg'
      }]
    },

    container: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: Math.floor(10 / 120 * width),
      borderWidth: Math.floor(2 / 120 * width),
      height: Math.floor((170 / 120) * width),
      width
    },

    number: {
      color: isCardRed(color) ? 'red' : 'black',
      fontSize: Math.floor(12 / 120 * width)
    },

    selectedContainer: {
      borderColor: 'blue'
    },

    text: {
      fontSize: Math.floor(10 / 120 * width)
    },

    topLeftContainer: {
      alignItems: 'center',
      left: Math.floor(6 / 120 * width),
      position: 'absolute',
      top: Math.floor(6 / 120 * width)
    }
  })
)

export default Card
