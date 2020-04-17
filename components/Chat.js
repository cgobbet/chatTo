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
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import KeyboardSpacer from 'react-native-keyboard-spacer';

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
		this.referenceMessageUser = null;
		this.referenceMessages = firebase.firestore().collection('messages');
		this.state = {
			messages: [],
			// uid: 0,
			// loggedInText: 'Processing authentication, please wait!',
		};
  }
	// User name on dialog box
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
      style: navigation.state.params.background,
    };
	};
	
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
			//delete your original listener, as well (as you no longer need it)
			this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
		});
		// start static message 
    this.setState({
			messages: [
				//  each message requires an ID, a creation date, and a user object
				{
					_id: 1,
					text: 'Hello Developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
				},
				{
					_id: 2,
					text: `${this.props.navigation.state.params.name} have just joined the chat`,
					createdAt: new Date(),
					system: true,
				},
			],
		});
	}
	
	componentWillUnmount() {
	// Stop listening to authentication
	this.authUnsubscribe();
	// Stop listening for changes
	// this.unsubscribeListUser();
	}
	
		onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// Go through each document
		querySnapshot.forEach((doc) => {
			// Get querySnapshot's data
			var data = doc.data();
			messages.push({
				_id: data._id,
				createdAt:data.createdAt.toDate(),
				text: data.text,
				user: {
					_id: data.user._id,
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
		// Add new list to collection
		this.referenceMessages.add({
			_id: this.state.messages[0]._id,
			text: this.state.messages[0].text,
			createdAt: this.state.messages[0].createdAt,
			user: this.state.messages[0].user,
			uid: this.state.messages[0].uid,
		});
	};

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
      })
  };

  renderBubble(props) {
    return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#1E90FF',
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
				{/* <FlatList
					data={this.state.messages}
					renderItem={({ item }) => (
						<Text>
							{item.name}: {item.items}
						</Text>
					)}
				/> */}
				<GiftedChat
					style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
					}}
				/>
				{Platform.OS === 'android' ? <KeyboardSpacer /> : null}
				{/* <GiftedChat
					style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
					}}
				/> */}
				{/* <Text style={{ color: '#FFFFFF' }}>Chat Screen</Text> */}
			</View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});