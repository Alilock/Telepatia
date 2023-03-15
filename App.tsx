import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './src/navigations/index'
import { Provider } from 'react-redux'
import { store } from './src/redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const MyTheme: any = {
    colors: {
      background: '#1c1c1c',
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Navigator />
      </NavigationContainer>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({

})