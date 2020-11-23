import React, { memo } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native'

import InGameFooter from '../components/InGame/Footer'
import InGameHeader from '../components/InGame/Header'
import InGamePlayedCards from '../components/InGame/PlayedCards'

const InGame = memo(() => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        renderItem={() => null}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={<InGameHeader />}
        ListEmptyComponent={<InGamePlayedCards />}
        ListFooterComponent={<InGameFooter />}
      />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contentContainer: {
    flexGrow: 1,
    width: '100%'
  }
})

export default InGame
