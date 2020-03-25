/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
export default class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
    };
  }

  loadContacts = async () => {
    var data = [];
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal',
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
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: '#2196F3', fontWeight: 'bold', fontSize: 26 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].number}
      </Text>
    </View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});