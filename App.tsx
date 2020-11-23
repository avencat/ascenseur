import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate} from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigator from './src/navigation/main'
import { persistedStore, store } from './src/redux/store'
import { navigationRef } from './src/navigation/NavigationActions'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
)

export default App
