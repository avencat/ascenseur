import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CardColor } from '../interfaces'
import { calculateColumns } from '../utils'

interface Props {
  color: CardColor
  value: number
}

const CardContent = memo<Props>(({ color, value }) => {
  const columns = useMemo(() => value > 10 ? [['']] : calculateColumns(value), [value])

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

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-evenly'
  },

  columnItem: {
    fontSize: 12
  },

  columnItemReversed: {
    transform: [{
      rotate: '180deg'
    }]
  },

  columnItemSolo: {
    fontSize: 50
  },

  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginVertical: 10
  }
})

export default CardContent
