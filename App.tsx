import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './src/navigations/index'
import { Provider } from 'react-redux'
import { store } from './src/redux'
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({

})