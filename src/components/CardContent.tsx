import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CARD_COLOR } from '../interfaces'
import { calculateColumns } from '../utils'

interface Props {
  color: CARD_COLOR
  value: number
  width?: number
}

const CardContent = memo<Props>(({ color, value, width }) => {
  const columns = useMemo(() => value > 10 ? [['']] : calculateColumns(value), [value])
  const styles = useMemo(() => StyleSheetCreator(width), [width])

  return (
    <View style={styles.container}>
      {columns.map((column: string[], index: number) => (
        <View style={styles.column} key={`${color}-${index}`}>
          {column.map((elem, idx, arr) => (
            <Text
              key={`${color}-${index}-${idx}`}
              style={[
                arr.length < 2 && index === 0 ? styles.columnItemSolo : styles.columnItem,
                idx >= arr.length / 2 && styles.columnItemReversed
              ]}
            >
              {`${color}`}
            </Text>
          ))}
        </View>
      ))}
    </View>
  )
})

const StyleSheetCreator = (width = 120) => StyleSheet.create({
  column: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-evenly'
  },

  columnItem: {
    fontSize: Math.floor(12 / 120 * width)
  },

  columnItemReversed: {
    transform: [{
      rotate: '180deg'
    }]
  },

  columnItemSolo: {
    fontSize: Math.floor(50 / 120 * width)
  },

  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: Math.floor(20 / 120 * width),
    marginVertical: Math.floor(10 / 120 * width)
  }
})

export default CardContent
