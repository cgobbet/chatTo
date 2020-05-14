// import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const firebase = require('firebase');

export default class CustomActions extends React.Component {
	constructor() {
		super()
	}

	pickImage = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status === 'granted') {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: 'Images',
			}).catch(error => console.log(error));

			if (!result.cancelled) {
				this.setState({
					image: result,
				});
			}
		}
	};

	takePhoto = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);

		if (status === 'granted') {
			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: 'Images',
			}).catch(error => console.log(error));

			if (!result.cancelled) {
				this.setState({
					image: result,
				});
			}
		}
	};

	async getLocation() {
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				const location = await Location.getCurrentPositionAsync({})
				.catch(error => console.log(error));

				if (location) {
					this.props.onSend({
						location: {
							longitude: location.coords.longitude,
							latitude: location.coords.latitude
						}
					});
				}
			}
		} catch (error) {
				console.log(error.message);
		}
  };

	onActionPress = () => {
		const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
		const cancelButtonIndex = options.length - 1;
		this.context.actionSheet().showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async (buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						console.log('user wants to pick an image');
						return;
					case 1:
						console.log('user wants to take a photo');
						return;
					case 2:
						console.log('user wants to get their location');
					default:
				}
			},
		);
	};

	render() {
		return (
			<TouchableOpacity 
				accessibility={true}
				accessibilityLabel={'Click for options'}
				style={[styles.container]} 
				onPress={this.onActionsPress}>
				
				<View style={[styles.wrapper, this.props.wrapperStyle]}>
					<Text style={[styles.iconText, this.props.iconTextStyle]}>
					+
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
});

CustomActions.contextTypes = {
	actionSheet: PropTypes.func,
};
