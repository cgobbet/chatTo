import 'firebase/firestore';

import { AsyncStorage, Platform, StyleSheet, View, YellowBox } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { decode, encode } from 'base-64';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import _ from 'lodash';
import firebase from 'firebase';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
	if (message.indexOf('Setting a timer') <= -1) {
		_console.warn(message);
	}
};

// Flatlist
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
			messages: [],
			uid: 0, //! does not exist
			user: {
				_id: '',
				name: '',
				avatar: '', 
      },
      isConnected: false,
    };

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
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
			if (this.state.isConnected) {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log(`'Sign in has failed:' ${error.message}`);
              }
            }

            this.setState({
              isConnected: true,
              user: {
                _id: user._id, // ! _id: user.uid,
                name: this.props.navigation.state.params.name,
                avatar: 'https://placeimg.com/140/140/any',
              },
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

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
        // user: {
        //   _id: data._id,
        //   name: user.name,
        //   avatar: data.avatar,
        // }
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      // user: this.state.user,
      user: this.state.messages[0].user,
			uid: this.state.uid, // !
    });
  }

  async getMessages() {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(`I am unable to retrieve the messages: ${error.message}`);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(`I could not save the message: ${error.message}`);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
			console.log(`Regrettably I am not competent enough to delete this message: ${error.message}`);
    }
  }

  onSend = (messages = []) => {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      },
    );
  };

  renderInputToolbar(props){
    if (this.state.isConnected == false){
    } else {
      return (
        <InputToolbar
          {...props}
        />
      )
    }
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

  render() {
    return (
			<View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
			>
				<GiftedChat
					user={this.state.user}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					renderBubble={this.renderBubble.bind(this)}
					renderInputToolbar={this.renderInputToolbar.bind(this)}
				/>
				{Platform.OS === 'android' ? <KeyboardSpacer /> : null}
			</View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// color: '#FFFFFF',
		backgroundColor: '#000000',
	},
	// mapContainer: {
	// 	margin: 1,
	// 	width: 250,
	// 	height: 200,
	// 	borderRadius: 13,
	// },
});