/* eslint-disable prettier/prettier */
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    Alert,
  } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RNVoiceRecorder} from 'react-native-voice-recorder';
import {connect} from 'react-redux';
import {store} from '../App';

let uploadAudio = async (filePath, st, fileNum) => {
  const path = `file://${filePath}`;
  console.log(path);
  const formData = new FormData();
  formData.append('file', {
    uri: path,
    name: 'test.wav',
    type: 'audio/wav',
  });
  try {
    const res = await fetch('http://192.168.0.161:8080/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'username': st.username,
        'password': st.password,
        'fileNum': fileNum,
      },
      body: formData,
    });
    console.log(res);
    const json = await res.json();
    console.log(json.message);
  } catch (err) {
    console.log(err);
  }
};

let sendData = async (state) => {
  const res = await fetch('http://192.168.0.161:8080/writedb', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      state: state,
    }),
  });
  //console.log(JSON.parse(JSON.stringify(res)));
  //return res.message;
  const json = await res.json();
  console.log(json.message);
  return json.message;
};

class Home extends React.Component {
      constructor(props) {
          super(props);
          this.state = store.getState();
      }
      render() {
        return (
        <>
            <SafeAreaView style={styles.scrollView}>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {global.HermesInternal == null ? null : (
                  <View style={styles.engine}>
                    <Text style={styles.footer}>Engine: Hermes</Text>
                  </View>
                )}
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Hi {this.state.username}</Text>
                    <Text style={styles.sectionDescription}>
                      This is a companion app for your <Text style={styles.highlight}>UnDanger</Text> wearable device.
                      Follow the below steps to set it up.{'\n'}
                    </Text>
                    <Text style={styles.sectionDescription}>Step 1: Record 3 samples of your hotword</Text>
                    <View style={{ flexDirection: 'row', padding: 8, justifyContent: "center" }}>                    
                      <Button
                        title="Sample 1"
                        onPress={() => RNVoiceRecorder.Record({
                          format: 'wav',
                          onDone: (path) => {
                            console.log('record done: ' + path);
                            this.props.markRecorded();
                            uploadAudio(path, this.state, '1');
                          },
                          onCancel: () => {
                            console.log('on cancel');
                          },
                        })
                      }
                      />
                      <Text>{'\t'}</Text>
                      <Button
                        title="Sample 2"
                        onPress={() => RNVoiceRecorder.Record({
                          format: 'wav',
                          onDone: (path) => {
                            console.log('record done: ' + path);
                            this.props.markRecorded();
                            uploadAudio(path, this.state, '2');
                          },
                          onCancel: () => {
                            console.log('on cancel');
                          },
                        })
                      }
                      />
                      <Text>{'\t'}</Text>
                      <Button
                        title="Sample 3"
                        onPress={() => RNVoiceRecorder.Record({
                          format: 'wav',
                          onDone: (path) => {
                            console.log('record done: ' + path);
                            this.props.markRecorded();
                            uploadAudio(path, this.state, '3');
                          },
                          onCancel: () => {
                            console.log('on cancel');
                          },
                        })
                      }
                      />
                      <Text>{'\t'}</Text>
                    </View>
                    <Text style={styles.sectionDescription}>{'\n'}Step 2: Select some of your contacts to reach out in case of an emergency{'\n'}</Text>
                    <Button
                        title="Select Emergency Contacts"
                        onPress={() => this.props.navigation.navigate('ContactList')}
                    />
                    <Text style={styles.sectionDescription}>{'\n'}Step 3: Save changes, logout if you want{'\n'}</Text>
                    <View style={{ flexDirection: 'row', padding: 8, justifyContent: "center" }}>                    
                      <Button
                          title="Confirm changes"
                          color="green"
                          onPress={() => {
                            if (this.state.emergency == undefined || this.state.emergency.length == 0) {
                              Alert.alert(
                                'Error',
                                'Emergency contacts not yet set. Set them before proceeding.',
                                [
                                  {text: 'OK', onPress: () => {
                                        console.log('OK was pressed');
                                        },
                                    },
                                ],
                                { cancelable: false }
                              );
                            }
                            else if (this.state.recordingSaved < 3) {
                              Alert.alert(
                                'Error',
                                'All voice samples have not been recorded. Record it before proceeding.',
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
                              sendData(this.state).then((res) => {
                                console.log(res);
                                Alert.alert(
                                  'Success',
                                  'Data successfully sent. You can safely logout now.',
                                  [
                                    {text: 'OK', onPress: () => {
                                          console.log('OK was pressed');
                                          },
                                      },
                                  ],
                                  { cancelable: false }
                                );
                              });
                            }
                          }}
                      />
                      <Text>{'\t\t'}</Text>
                      <Button
                          title="Logout"
                          color="red"
                          onPress={() => {
                            Alert.alert(
                              'Logout?',
                              'Are you sure you want to log out? Unsaved changes will be lost!',
                              [
                                {text: 'Cancel', onPress: () => {}},
                                {text: 'Yes', onPress: () => {
                                    this.props.logout();
                                    this.props.navigation.reset({
                                      index: 0,
                                      routes: [{ name: 'Login' }],
                                    });
                                  },
                                },
                              ],
                              { cancelable: false }
                            );
                          }}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        </>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
      markRecorded: () => dispatch({ type: 'SAVE_RECORDING'}),
      logout: () => dispatch({ type: 'LOGOUT' }),
  };
}

export default connect(null,mapDispatchToProps)(Home);

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