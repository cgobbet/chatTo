import * as ImagePicker from 'expo-image-picker';
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

// selects images after permission granted	
	async pickImage() {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status === 'granted') {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					quality: 1,
				}).catch(error => console.log(error));

				if (!result.cancelled) {
					const imageUrl = await this.uploadImage(result.uri);
					this.props.onSend({ image: imageUrl });
				}
				console.log(result);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	// Take photo with device camera if permission granted
	async takePhoto() {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

			if (status === 'granted') {
				let result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
				}).catch(error => console.log(error));

				if (!result.cancelled) {
					const imageUrlLink = await this.uploadImage(result.uri);
					this.props.onSend({ image: imageUrlLink });
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	async getLocation() {
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				const location = await Location.getCurrentPositionAsync({}).catch(error =>
					console.log(error),
				);

				if (location) {
					this.props.onSend({
						location: {
							longitude: location.coords.longitude,
							latitude: location.coords.latitude,
						}
					});
				}
			}
		} catch (error) {
				console.log(error.message);
		}
  };

	onActionPress = () => {
		const options = ['Select Image from Library', 'Take a Photo', 'Share Location', 'Cancel'];
		const cancelButtonIndex = options.length - 1;
		this.context.actionSheet().showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async buttonIndex => {
				switch (buttonIndex) {
					case 0:
						//console.log('pick image from library');
						return this.pickImage();
					case 1:
						//console.log('take photo');
						return this.takePhoto();
					case 2:
						//console.log('get location');
						return this.getLocation();
					default:
				}
			},
		);
	};

	render() {
		return (
			<TouchableOpacity
				accessible={true}
				accessibilityLabel='Click to see options!'
				accessibilityHint='Action options allow you to pick from you library image, take a picture or share your location'
				style={[styles.container]}
				onPress={this.onActionPress}
			>
				<View style={[styles.wrapper, this.props.wrapperStyle]}>
					<Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
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
