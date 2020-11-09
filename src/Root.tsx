import React, { memo, useCallback, useMemo } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import Card from './components/Card'
import { generateDeck, shuffle } from './utils'

const Root = memo(() => {
  const deck = useMemo(() => shuffle(generateDeck()), [])
  const renderCard = useCallback(({ item }) => <Card {...item} />, [])

  return (
    <SafeAreaView>
      <FlatList
        data={deck}
        renderItem={renderCard}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 10
  }
})

export default Root
