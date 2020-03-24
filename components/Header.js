/* eslint-disable prettier/prettier */
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Component,
  } from 'react-native';

export default function Header(props) {
        return (
        <View style={styles.container}>
            <Text>Made with react native</Text>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
});