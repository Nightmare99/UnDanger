/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2196F3"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'UnDanger',
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTitleStyle: {
              color: Colors.white,
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{
            title: 'Dummy',
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTitleStyle: {
              color: Colors.white,
            },
            headerTintColor: '#fff',
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
