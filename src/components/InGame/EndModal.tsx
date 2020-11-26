import React, { memo, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { GlobalState, Player } from '../../interfaces'

interface StateProps {
  finalRoundCount?: number
  me?: Player
  players: Player[]
  winner?: Player
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  finalRoundCount: state.game.finalRoundCount,
  me: state.game.player,
  players: state.game.players,
  winner: state.game.winner
})

const EndModal = connect(mapStateToProps)(memo<Props>(({
  finalRoundCount,
  me,
  players: playersUnsorted,
  winner
}) => {
  const players = useMemo(() => (
    playersUnsorted.sort((a, b) => b.score - a.score)
  ), [playersUnsorted])

  const renderPlayer = useCallback(({ item }: { item: Player }) => {
    return (
      <View style={styles.row}>
        <View style={styles.gridColumnName}>
          <Text style={styles.gridContent}>
            {item.name}
          </Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridContent}>{item.score}</Text>
        </View>
      </View>
    )
  }, [])

  const renderItemSeparator = useCallback(() => {
    return <View style={styles.separator} />
  }, [])

  const renderTableHeader = useCallback(() => {
    return (
      <View style={[styles.row, styles.separator]}>
        <View style={styles.gridColumnName}>
          <Text style={styles.gridHeader}>Nom</Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridHeader}>Score</Text>
        </View>
      </View>
    )
  }, [])
  const amWinner = useMemo(() => me && winner?._id === me?._id, [me, winner])

  // @TODO Remove once Expo upgrades react-native-web to v0.14 (also remove custom modal style)
  if (!winner) {
    return null
  }

  return (
    <Modal visible={!!winner} style={Platform.OS === 'web' && styles.modal}>
      {/* @TODO remove custom <Modal> styles once react-native-web has been updated to 0.14 */}
      <SafeAreaView style={styles.container}>
        <Text>
          {'Vous avez '}
          <Text style={{ color: amWinner ? 'green' : 'orange' }}>
            {amWinner ? 'gagné !' : 'perdu'}
          </Text>
          {` en ${
            finalRoundCount || 0
          } manches`}
        </Text>

        <View style={styles.gridContainer}>
          <FlatList
            bounces={false}
            data={players}
            ItemSeparatorComponent={renderItemSeparator}
            keyExtractor={item => item._id}
            ListHeaderComponent={renderTableHeader}
            listKey='firstPlayers'
            renderItem={renderPlayer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </Modal>
  )
}))

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  gridColumn: {
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    flex: 4
  },

  gridColumnName: {
    flex: 7,
    padding: 5
  },

  gridContainer: {
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 15,
    marginTop: 50,
    width: Dimensions.get('window').width - 30
  },

  gridContent: {
    fontSize: 12
  },

  gridHeader: {
    fontSize: 13
  },

  // @TODO Remove once react-native-web 0.14 is available on this project
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white'
  },

  row: {
    flexDirection: 'row'
  },

  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
})

export default EndModal
