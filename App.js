/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header';
import ActionBar from 'react-native-action-bar';
import { RNVoiceRecorder } from 'react-native-voice-recorder';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ActionBar 
        allowFontScaling={true}
        containerStyle={styles.bar}
        titleStyle={styles.barText}
        backgroundColor={"#2196F3"}
        title={'UnDanger'}/>
      <SafeAreaView style={styles.scrollView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header/>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hi</Text>
              <Text style={styles.sectionDescription}>
                This is a companion app for your <Text style={styles.highlight}>UnDanger</Text> wearable device.
                Use it to set up your emergency contacts and hotwords.{"\n"}
              </Text>
              <Button
                title="Send voice data"
                onPress={() => RNVoiceRecorder.Record({
                  format: 'wav',
                  onDone: (path) => {
                    console.log('record done: ' + path)
                  },
                  onCancel: () => {
                    console.log('on cancel');
                  },
                })
              }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 64,
  },
  barText: {
    fontSize: 24,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
