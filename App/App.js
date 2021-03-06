/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Home from './components/Home';
import ContactList from './components/ContactList';
import Login from './components/Login';
import Register from './components/Register';
import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const Stack = createStackNavigator();

const initialState = {
  username: 'null',
  password: 'null',
  emergency: [],
  recordingSaved: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN':
          console.log('From reducer');
          console.log(action.payload);
          return action.payload;
      case 'LOGOUT':
          return { username: '', password: '', emergency: [], recordingSaved: 0 };
      case 'SET_EMERGENCY_CONTACTS':
          state.emergency = action.payload;
          console.log(state);
          return state;
      case 'SAVE_RECORDING':
          state.recordingSaved += 1;
          console.log(state);
          return state;
  }
  return state;
};

export const store = createStore(reducer);
//console.log(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
              name="Register"
              component={Register}
              options={{
                title: 'Register',
              }}
            />
            <Stack.Screen
              name="ContactList"
              component={ContactList}
              options={{
                title: 'Select Emergency Contacts',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
