import { connect } from 'react-redux'
import React, { memo, useCallback } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'

import Card from '../Card'
import {
  convertServerCardColorToCardColor,
  GlobalState,
  Player,
  SERVER_CARD_COLOR
} from '../../interfaces'

interface StateProps {
  asset: {
    color?: SERVER_CARD_COLOR
    number?: number
  }
  currentPlayerTurnId: string
  players: Player[]
}

type Props = StateProps

const mapStateToProps = (state: GlobalState): StateProps => ({
  asset: {
    color: !!(state.game.oldAssetColor && state.game.oldAssetNumber)
      ? state.game.oldAssetColor
      : state.game.round?.asset,
    number: !!(state.game.oldAssetColor && state.game.oldAssetNumber)
      ? state.game.oldAssetNumber
      : state.game.round?.assetNumber
  },
  currentPlayerTurnId: state.game.currentPlayerTurn?._id ?? '',
  players: state.game.players
})

const InGameHeader = connect(
  mapStateToProps
)(memo<Props>(({
  asset,
  currentPlayerTurnId,
  players
}) => {
  const renderPlayer = useCallback(({ item }: { item: Player }) => {
    const isHisTurn = item._id === currentPlayerTurnId

    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.gridContent}>{isHisTurn ? '>' : ''}</Text>
        </View>
        <View style={styles.gridColumnName}>
          <Text style={[styles.gridContent, isHisTurn && styles.currentTurnName]}>
            {item.name}
          </Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridContent}>
            {typeof item.bet === 'number' ? item.bet : '...'}
          </Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridContent}>{item.score}</Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridContent}>{item.turnWon}</Text>
        </View>
      </View>
    )
  }, [currentPlayerTurnId])

  const renderItemSeparator = useCallback(() => {
    return <View style={styles.separator} />
  }, [])

  const renderTableHeader = useCallback(() => {
    return (
      <View style={styles.row}>
        <View style={styles.column} />
        <View style={styles.gridColumnName}>
          <Text style={styles.gridHeader}>Nom</Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridHeader}>Contrat</Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridHeader}>Score</Text>
        </View>
        <View style={[styles.gridColumn, styles.center]}>
          <Text style={styles.gridHeader}>Plis</Text>
        </View>
      </View>
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <FlatList
          listKey='firstPlayers'
          data={players}
          keyExtractor={item => item._id}
          renderItem={renderPlayer}
          ListHeaderComponent={renderTableHeader}
          ItemSeparatorComponent={renderItemSeparator}
        />
      </View>
      <View style={[styles.column, styles.flexEnd]}>
        <View>
          <Text style={styles.title}>
            Atout :
          </Text>
          {!!(asset.number && asset.color) && (
            <Card
              color={convertServerCardColorToCardColor(asset.color)}
              identifier={`${asset.color}-${asset.number}`}
              number={asset.number}
              value={asset.number}
              width={Math.min(Math.floor((Dimensions.get('window').width - 30) / 4), 120)}
            />
          )}
        </View>
      </View>
    </View>
  )
}))

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  column: {
    flex: 1
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15
  },

  currentTurnName: {
    color: 'blue'
  },

  flexEnd: {
    alignItems: 'flex-end'
  },

  gridColumn: {
    flex: 4
  },

  gridColumnName: {
    flex: 7
  },

  gridContainer: {
    flex: 2
  },

  gridContent: {
    fontSize: 10
  },

  gridHeader: {
    fontSize: 11
  },

  row: {
    flexDirection: 'row'
  },

  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },

  title: {
    marginBottom: 10
  }
})

export default InGameHeader
