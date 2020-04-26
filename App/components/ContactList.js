/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import FAB from 'react-native-fab';
import {TouchableOpacity} from 'react-native-gesture-handler';
import _ from 'lodash';
import {connect} from 'react-redux';

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
      selected: [],
    };
  }

  loadContacts = async () => {
    var data = [];
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept',
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          console.log('Permission was denied');
        } else {
          for (var contact of contacts) {
            if (contact.phoneNumbers.length > 0)
              data.push({firstName: contact['givenName'],
                lastName: contact['familyName'],
                phoneNumbers: contact['phoneNumbers'],
                selected: false,
              });
          }
          //console.log(data);
          //console.log(data[0]);
          //console.log(data[4]);
        }
      });
    });

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{ minHeight: 70, padding: 5, backgroundColor: item.selected ? '#cccccc' : 'white', }}
      onPress={() => {
          item.selected = !item.selected;
          var newSelected = this.state.selected;
          if (item.selected) {
            newSelected.push({name: item.firstName + ' ' + item.lastName, phone: item.phoneNumbers[0].number});
            this.setState({ selected: newSelected });
            console.log(newSelected);
          }
          else {
              _.remove(newSelected, {name: item.firstName + ' ' + item.lastName, phone: item.phoneNumbers[0].number});
              this.setState({ selected: newSelected });
              console.log(newSelected);
          }
        }
      }
    >
      <Text style={{ color: '#2196F3', fontWeight: 'bold', fontSize: 26 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].number}
      </Text>
    </TouchableOpacity>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: '#ffffff',
            height: 50,
            fontSize: 24,
            padding: 10,
            color: 'black',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#2196F3" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{ color: '#2196F3' }}>No Contacts Found</Text>
              </View>
            )}
          />
        </View>
        <FAB 
          buttonColor="green"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            console.log(this.state.selected);
            if (this.state.selected.length == 0) {
              Alert.alert(
                'Error',
                'Emergency contacts cannot be empty. ',
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
              console.log("Emergency contacts set!");
              this.props.setEmergency(this.state.selected);
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }
            }
          }
          visible={true}
          iconTextComponent={<Text>✓</Text>}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      setEmergency: (emergency) => dispatch({ type: 'SET_EMERGENCY_CONTACTS', payload: emergency }),
  };
}

export default connect(null,mapDispatchToProps)(ContactList);
