/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
  } from 'react-native';
import {connect} from 'react-redux';

let sendData = async (username, password) => {
    const res = await fetch('http://192.168.0.161:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    //console.log(JSON.parse(JSON.stringify(res)));
    //return res.message;
    const json = await res.json();
    console.log(json.message);
    return json.message;
  };

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
      }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.heading}>Login{'\n'}</Text>
            </View>
            <View style={styles.input}>
                <Text>Username: </Text>
                <TextInput onChangeText={(username) => this.setState({username})}/>
            </View>
            <View style={styles.input}>
                <Text>Password: </Text>
                <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            </View>
            <Text>{'\n\n\n'}</Text>
            <Button
                title="Login"
                onPress={() => {
                    var user = {
                        username: this.state.username,
                        password: this.state.password,
                    };
                    sendData(user.username, user.password).then((pass) => {
                        if (pass === 'failed') {
                            console.log('Failed login attempt');
                            Alert.alert(
                                'Login failed!',
                                'Check credentials and try again.',
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
                            console.log(user);
                            this.props.login(user);
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        }
                    });
                }
            }
            />
            <Text>{'\n\n\n'}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{color: 'blue'}}>Register now</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch({ type: 'LOGIN', payload: user }),
    };
}

export default connect(null,mapDispatchToProps)(Login);


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