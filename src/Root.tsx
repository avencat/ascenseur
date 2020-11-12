import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import React, { memo, useCallback, useMemo } from 'react'
import { Button, SafeAreaView, StyleSheet } from 'react-native'

import Card from './components/Card'
import { initGame } from './redux/actions'
import { generateDeck, shuffle } from './utils'

interface DispatchProps {
  initGame(nbPlayers: number): void
}

type Props = DispatchProps

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  initGame: (nbPlayers) => dispatch(initGame({ nbPlayers }))
})

const Root = connect(null, mapDispatchToProps)(memo<Props>(({ initGame }) => {
  const deck = useMemo(() => shuffle(generateDeck()), [])
  const renderCard = useCallback(({ item }) => <Card {...item} />, [])
  const initGameCallback = useCallback(() => initGame(3), [initGame])

  return (
    <SafeAreaView>
      {/*<FlatList
        data={deck}
        renderItem={renderCard}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />*/}
      <Button title='Init game' onPress={initGameCallback} />
    </SafeAreaView>
  )
}))

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 10
  }
})

export default Root
