// messages // lists
// database: chat-to // test
// Collection: messages // shoppinglists
// referenceMessages // referenceShoppingLists;
// referenceMessageUser // referenceShoppinglistUser
// message {
//   _id // name
//   text // items
//   createdAt
//   user //identifier
//   uid //uid
// }

import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { decode, encode } from 'base-64';

// import Button from 'apsl-react-native-button';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { YellowBox } from 'react-native';
import _ from 'lodash';

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

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
	constructor() {
		super();
		if (!firebase.apps.length) {
			// Web app's Firebase configuration
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

		//reference to the FB collection
		// this.referenceMessageUser = null;
		this.referenceMessages = firebase.firestore().collection('messages');
		this.state = {
			messages: [],
			uid: 0,
			// loggedInText: 'Processing authentication, please wait!',
			user: {
				uid: '',
				name: '',
				avatar: ''
			},
		};
	}
	
	componentDidMount() { 
		// anonymous auth process
		this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
			if (!user) {
				user = await firebase.auth().signInAnonymously();
			}
			this.setState({
				uid: user.uid,
				loggedInText: 'You are now logged',
			});
			this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
		});
		// start system message 
    this.setState({
			messages: [
				//  each message requires an ID, a creation date, and a user object
				{
					_id: 124098920,
					text: 'Alô você',
					createdAt: new Date(),
					user: {
						_id: 5,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
				},
				{
					_id: 2,
					text: `${this.props.navigation.state.params.name} have just joined the chat`, // ! DIFF HERE
					createdAt: new Date(),
					system: true,
				},
			],
		});
	}

	componentWillUnmount() {
	// Stop listening to authentication
	this.authUnsubscribe();
	}

		onCollectionUpdate = querySnapshot => {
		const messages = [];
		// Go through each document
		querySnapshot.forEach(doc => {
			// Get querySnapshot's data
			var data = doc.data();
			messages.push({
				_id: data._id,
				createdAt: data.createdAt.toDate(),
				text: data.text,
				// user: data.user,
				user: { //! DIFF HERE
					_id: data.user._id,
					// _id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
			});
		});
		// set the current data in state
		this.setState({
			messages,
		});
	};

	addMessage() {
		// Add new message to collection, setting message id, content, creation date and user id
		this.referenceMessages.add({
			_id: this.state.messages[0]._id,
			text: this.state.messages[0].text,
			createdAt: this.state.messages[0].createdAt,
			user: this.state.messages[0].user,
			// user: this.state.user,
			uid: this.state.uid,
		});
	}

  onSend(messages = []) {
    this.setState(
			previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
			},
		);
  }

  renderBubble(props) {
    return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#1E90FF',
						// avatar: this.state.avatar,
					},
				}}
			/>
		);
	}

	//  This adds the users name to the header
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params.name,
		};
	};
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
				
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
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
		color: '#000000',
		alignSelf: 'center',
		opacity: 0.5,
		marginTop: 25,
	},
});