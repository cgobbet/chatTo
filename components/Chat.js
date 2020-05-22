import 'firebase/firestore';

import { AsyncStorage, Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { decode, encode } from 'base-64';

import { Component } from 'react';
import CustomActions from './CustomActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import NetInfo from '@react-native-community/netinfo';
import React from 'react';
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
			style: navigation.state.params.background,
		};
	};
	constructor() {
		super();

		this.state = {
			messages: [],
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
			isConnected: false,// this line was creating an error, forcing to use this.state.isConnected on line 101
			image: null,
			location: null,
		};
		// Initialize Firebase
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
  //async get messages from local storage
	async getMessages() {
		let messages = [];
		try {
			messages = (await AsyncStorage.getItem('messages')) || [];
			this.setState({
				messages: JSON.parse(messages)
			});
		} catch (error) {
			console.log(error.message);
		}
	}
	// Save messages locally(asyncStorage)
	async saveMessages() {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
		} catch (error) {
			console.log(error.message);
		}
	}

	// delete messages locally(asyncStorage)
	async deleteMessages() {
		try {
			await AsyncStorage.removeItem('messages');
		} catch (error) {
			console.log(error.message);
		}
	}
	componentDidMount() {
		NetInfo.fetch().then(state => {
			//checks Internet connection
			if (state.isConnected) {

				this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
					if (!user) {
						try {
							await firebase.auth().signInAnonymously();
						} catch (error) {
							console.log(error.message);
						}
					}
				// gets the most recent data for state
					this.setState({
						isConnected: true,
						user: {
							_id: user.uid,
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
			// if user is offline
				this.setState({
					isConnected: false,
				});
				this.getMessages();
			}
		});
	}

	// fills message state with input data
	onCollectionUpdate = querySnapshot => {
		const messages = [];
		// loop through documents
		querySnapshot.forEach(doc => {
			// get data snapshot
			var data = doc.data();
			messages.push({
				_id: data._id, // message unique ID
				text: data.text.toString(), // msg content
				createdAt: data.createdAt.toDate(),
				user: { // user data
					_id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
				image: data.image || '',
				location: data.location, // location data
			});
		});
		this.setState({
			messages,
		});
	};

	// produces message body and metadata 
	addMessage() {
		const message = this.state.messages[0];
		this.referenceMessages.add({
			_id: message._id,
			text: message.text || '',
			createdAt: message.createdAt,
			user: message.user,
			image: message.image || '',
			location: message.location || null,
			sent: true,
		});
	}

	// save locally the sent message 
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
	}

	// Hide toolbar if user is offline
	renderInputToolbar = props => {
		if (this.state.isConnected === false) {
		} else {
			return <InputToolbar {...props} />;
		}
	};
// manages message bubble colour
	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#781820',
					},
					left: {
						backgroundColor: '#87CEFA',
					},
				}}
			/>
		);
	}

	// customize message view options
	renderCustomView(props) {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<View>
					<MapView
						style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
						region={{
							latitude: currentMessage.location.latitude,
							longitude: currentMessage.location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					/>
				</View>
			);
		}
		return null;
	}
  // add custom actions from CustomAcions.js file
	renderCustomActions = props => {
		return <CustomActions {...props} />;
	};

	// Stop listening for changes
	componentWillUnmount() {
		this.authUnsubscribe();
		this.unsubscribe();
	}

	render() {
		return (
			<View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.selectedColor }]}
			>
				<GiftedChat
					scrollToBottom
					messages={this.state.messages}
					user={this.state.user}
					showUserAvatar={true}
					renderUsernameOnMessage={true}
					renderCustomView={this.renderCustomView}
					renderActions={this.renderCustomActions}
					onSend={messages => this.onSend(messages)}
					renderInputToolbar={this.renderInputToolbar}
					renderBubble={this.renderBubble}
					image={this.state.image}
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