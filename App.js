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
import Login from './components/Login';
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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTitleStyle: {
            color: Colors.white,
          },
          headerTintColor: '#fff',
        }}
      >
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Welcome to UnDanger',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'UnDanger',
          }}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{
            title: 'Dummy',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
