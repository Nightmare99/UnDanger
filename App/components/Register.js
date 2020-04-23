/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert,
  } from 'react-native';

let sendData = async (username, password, email) => {
    const res = await fetch('http://192.168.0.161:8080/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    console.log(res);
    //console.log(JSON.parse(JSON.stringify(res)));
    //return res.message;
    const json = await res.json();
    console.log(json.message);
    return json.message;
  };

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', email: '', confirm: ''};
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.heading}>Register new account{'\n'}</Text>
            </View>
            <View style={styles.input}>
                <Text>Email: </Text>
                <TextInput onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={styles.input}>
                <Text>Username: </Text>
                <TextInput onChangeText={(username) => this.setState({username})}/>
            </View>
            <View style={styles.input}>
                <Text>Password: </Text>
                <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            </View>
            <View style={styles.input}>
                <Text>Confirm password: </Text>
                <TextInput secureTextEntry={true} onChangeText={(confirm) => this.setState({confirm})}/>
            </View>
            <Text>{'\n\n\n'}</Text>
            <Button
                title="Create account"
                onPress={() => {
                    if (this.state.password !== this.state.confirm) {
                        Alert.alert(
                            'Error',
                            'Passwords do not match. Try again.',
                            [
                              {text: 'OK', onPress: () => {
                                    console.log('OK was pressed');
                                    },
                                },
                            ],
                            { cancelable: false }
                          );
                    }
                    else {
                        var user = {
                            email: this.state.email,
                            username: this.state.username,
                            password: this.state.password,
                        };
                        sendData(user.username, user.password, user.email).then((pass) => {
                            if (pass === 'email exists') {
                                console.log('Email exists in db');
                                Alert.alert(
                                    'Error',
                                    'Email has already been registered.',
                                    [
                                      {text: 'OK', onPress: () => {
                                            console.log('OK was pressed');
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                  );
                            }
                            else if (pass == 'username exists') {
                                console.log('Username exists in db');
                                Alert.alert(
                                    'Error',
                                    'Username has already been registered.',
                                    [
                                      {text: 'OK', onPress: () => {
                                            console.log('OK was pressed');
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                            else {
                                console.log('New user created.');
                                console.log(user);
                                Alert.alert(
                                    'Success',
                                    'New account successfully created. Use the credentials to login in the next screen.',
                                    [
                                      {text: 'OK', onPress: () => {
                                            console.log('OK was pressed');
                                            this.props.navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Login' }],
                                            });
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        });
                    }
                }
            }
            />
        </View>
        );
    }
}

export default Register;

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