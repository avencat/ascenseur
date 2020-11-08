import React, { useCallback } from 'react'
import { FlatList, SafeAreaView } from 'react-native'

import Card from './src/components/Card'
import { generateDeck } from './src/utils'

const App = () => {
  const renderCard = useCallback(({ item }) => <Card {...item} />, [])

  return (
    <SafeAreaView>
      <FlatList
        data={generateDeck()}
        renderItem={renderCard}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-evenly', marginBottom: 10 }}
      />
    </SafeAreaView>
  )
}

export default App
