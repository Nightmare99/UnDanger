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
import {connect} from 'react-redux';

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
                    console.log(user);
                    this.props.login(user);
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                    }
                }
            />
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