import React, { memo } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet
} from 'react-native'

import EndModal from '../components/InGame/EndModal'
import InGameFooter from '../components/InGame/Footer'
import InGameHeader from '../components/InGame/Header'
import EndTurnModal from '../components/InGame/EndTurnModal'
import InGamePlayedCards from '../components/InGame/PlayedCards'
import { MainStackParamList, ROUTE_NAMES } from '../navigation/main'

interface Props {
  navigation: StackNavigationProp<MainStackParamList, ROUTE_NAMES.IN_GAME>
}


const InGame = memo<Props>(({ navigation }) => {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault()

        // Prompt the user before leaving the screen
        Alert.alert(
          'Quitter la partie',
          'Vous ne pourrez pas réintégrer la partie...',
          [
            { text: 'Rester', style: 'cancel', onPress: () => {} },
            {
              text: 'Quitter la partie',
              style: 'destructive',
              // If the user confirmed, then we dispatch
              // the action we blocked earlier
              // This will continue the action that had
              // triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  )

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

      <EndModal />

      <EndTurnModal />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 50 : undefined
  },

  contentContainer: {
    flexGrow: 1,
    width: '100%'
  }
})

export default InGame
