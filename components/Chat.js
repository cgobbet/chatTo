import 'firebase/firestore';

import { AsyncStorage, Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { decode, encode } from 'base-64';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import firebase from 'firebase';

YellowBox.ignoreWarnings(['Setting a timer']);

console.disableYellowBox = true;
window.addEventListener = x => x;
// Flatlist
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

export default class Chat extends React.Component {
// adds name to the top of chat window
  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.state.params.name,
    };
  };
  constructor() {
    super();



    if (!firebase.apps.length) {
      firebase.initializeApp({
				apiKey: 'AIzaSyBwNLF-v3vLoJTgCTz3xeoEmuO4-ANBeA0',
				authDomain: 'chatto-980f7.firebaseapp.com',
				databaseURL: 'https://chatto-980f7.firebaseio.com',
				projectId: 'chatto-980f7',
				storageBucket: 'chatto-980f7.appspot.com',
				messagingSenderId: '957475612917',
				appId: '1:957475612917:web:0de0f4a37c9f8cdd7c3dbc',
				measurementId: 'G-H8GTWS0C3G',
			});
    }
    this.referenceMessages = firebase.firestore().collection('messages');   
    
    this.state = {
			messages: [],
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
			uid: 0,
			// isConnected: false, - this line was creating an error, forcing to use this.state.isConnected on line 101
		};
  }

	getMessages = async () => {
		let messages = '';    
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(`I am unable to retrieve the messages: ${error.message}`);
    }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(`I could not save the message: ${error.message}`);
    }
  }

	deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
			console.log(`Regrettably I am not competent enough to delete this message: ${error.message}`);
    }
  }
  componentDidMount() {
    NetInfo.fetch().then(state => {
      //console.log('Connection type', state.type);
			if (state.isConnected) {
				//console.log('Is connected?', state.isConnected);        
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log(`'Sign in has failed: ' ${error.message}`);
              }
            }

            this.setState({
							isConnected: true,
							user: {
								_id: user._id, // ! _id: user.uid,
								name: this.props.navigation.state.params.name,
								// avatar: 'https://placeimg.com/140/140/any',
							},
							loggedInText: this.props.navigation.state.params.name + ' has entered the chat',
							messages: [],
						});
            this.unsubscribe = this.referenceMessages
						.orderBy('createdAt', 'desc')
						.onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
				_id: data._id,
				text: data.text.toString(),
				createdAt: data.createdAt.toDate(),
				// user: data.user,
				user: {
					_id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
			});
    });
    this.setState({
      messages,
    });
  };

	addMessage = () => {
		this.referenceMessages.add({
			_id: this.state.messages[0]._id,
			text: this.state.messages[0].text,
			createdAt: this.state.messages[0].createdAt,
			user: this.state.messages[0].user,
			uid: this.state.uid,
		});
	};

	onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      },
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#781820',
          },
          left: {
            backgroundColor: '#FF8C00'
          },
        }}
      />
    );
  }

  // Hide toolbar when user is offline
	renderInputToolbar = props => {
		if (this.state.isConnected === false) {
		} else {
			return <InputToolbar {...props} />;
		}
	};

  componentWillUnmount() {
    this.authUnsubscribe(); // error saying it is undefined
    this.unsubscribe();
  }

  render() {
    return (
			<View
				style={[
					styles.container,
					{
						backgroundColor: this.props.navigation.state.params.color,
					},
				]}
			>
				<GiftedChat
					renderInputToolbar={this.renderInputToolbar}
					renderBubble={this.renderBubble}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
						name: 'Cassiano',
						avatar: 'https://placeimg.com/140/140/any',
					}}
				/>
				{Platform.OS === 'android' ? <KeyboardSpacer /> : null}
			</View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	userName: {
		fontSize: 10,
		color: '#fff',
		alignSelf: 'center',
		opacity: 0.5,
		marginTop: 25,
	},
});