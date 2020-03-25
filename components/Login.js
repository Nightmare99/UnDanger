/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
  } from 'react-native';

export default function Header({ navigation }) {
        return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.heading}>Login{'\n'}</Text>
            </View>
            <View style={styles.input}>
                <Text>Username: </Text>
                <TextInput/>
            </View>
            <View style={styles.input}>
                <Text>Password: </Text>
                <TextInput secureTextEntry={true}/>
            </View>
            <Text>{'\n\n\n'}</Text>
            <Button
                title="Login"
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })}
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
    heading: {
        fontSize: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1,
    },
});