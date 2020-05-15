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
// import _ from 'lodash';
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

		this.state = {
			messages: [],
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
			uid: 0,
			isConnected: false, // this line was creating an error, forcing to use this.state.isConnected on line 101
			image: null,
			location: null,
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

	async getMessages() {
		let messages = [];
		try {
			messages = (await AsyncStorage.getItem('messages')) || [];
			this.setState({
				messages: JSON.parse(messages),
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
							avatar: 'https://placeimg.com/140/140/any',
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

	// fills message state with input data
	onCollectionUpdate = querySnapshot => {
		const messages = [];
		// loop through documents
		querySnapshot.forEach(doc => {
			// get data snapshot
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
				image: data.image,
				location: data.location,
			});
		});
		this.setState({
			messages,
		});
	};

	addMessage() {
		const message = this.state.messages[0];
		this.referenceMessages.add({
			_id: this.state.messages[0]._id,
			text: this.state.messages[0].text,
			createdAt: this.state.messages[0].createdAt,
			user: this.state.messages[0].user,
			uid: this.state.uid,
			location: this.state.location || null,
		});
	}

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

	// Hide toolbar when user is offline
	renderInputToolbar = props => {
		if (this.state.isConnected === false) {
		} else {
			return <InputToolbar {...props} />;
		}
	};

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#781820',
					},
					left: {
						backgroundColor: '#FF8C00',
					},
				}}
			/>
		);
	}

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

	renderCustomActions = props => {
		return <CustomActions {...props} />;
	};
	componentWillUnmount() {
		this.authUnsubscribe(); // error saying it is undefined
		this.unsubscribe();
	}

	render() {
		return (
			<View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
			>
				<GiftedChat
					messages={this.state.messages}
					user={{
						_id: 1,
						name: 'Cassiano',
						avatar: 'https://placeimg.com/140/140/any',
					}}
					renderCustomView={this.renderCustomView}
					renderActions={this.renderCustomActions}
					onSend={messages => this.onSend(messages)}
					renderInputToolbar={this.renderInputToolbar}
					renderBubble={this.renderBubble}
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