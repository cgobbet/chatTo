import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";

import Button from "apsl-react-native-button";
import KeyboardSpacer from "react-native-keyboard-spacer";

// import custom buttons

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      color: '',
      behavior: 'position'
    } // creates state for"name" and "color" 
  }

  render() {
    return (
			<ImageBackground
				style={styles.backgroundImage}
				source={require('../assets/background.png')}
				// source={require("../assets/dark_back.jpg")}
			>
				<Text style={styles.title}>ChatTo</Text>
				<View style={styles.container}>
					<TextInput
						style={styles.textInput}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
						placeholderTextColor={'black'}
						placeholder='Your name...'
						backgroundColor={'#F0F8FF'}
						// opacity='0.5'
					/>
				</View>
				<View style={styles.box}></View>
				<Text>Choose a background color:</Text>
				<View style={styles.colorBackground}>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='More options'
						accessibilityHint='Allows you to choose to send an image or your geolocation.'
						accessibilityRole='button'
						onPress={() => this.setState({ color: '#090C08' })}
						style={[styles.option1, styles.colorIcon]}
					/>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='More options'
						accessibilityHint='Allows you to choose to send an image or your geolocation.'
						accessibilityRole='button'
						onPress={() => this.setState({ color: '#474056' })}
						style={[styles.option2, styles.colorIcon]}
					/>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='More options'
						accessibilityHint='Allows you to choose to send an image or your geolocation.'
						accessibilityRole='button'
						onPress={() => this.setState({ color: '#8A95A5' })}
						style={[styles.option3, styles.colorIcon]}
					/>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='More options'
						accessibilityHint='Allows you to choose to send an image or your geolocation.'
						accessibilityRole='button'
						onPress={() => this.setState({ color: '#B9C6AE' })}
						style={[styles.option4, styles.colorIcon]}
					/>
				</View>
				<View style={{ margin: 10 }}>
					<Button
						accessible={true}
						accessibilityLabel='Start Chatting'
						style={styles.button}
						onPress={() =>
							this.props.navigation.navigate('Chat', {
								name: this.state.name,
								color: this.state.color,
							})
						}
					>
						Start Chatting
					</Button>
					{Platform.OS === 'android' ? <KeyboardSpacer /> : null}
				</View>
			</ImageBackground>
		);
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  container: {
    height: "54%",
    width: "88%",
    backgroundColor: "#fff",
    position: "absolute",
    marginLeft: 10,
    marginRight: 10,
    bottom: 30,
    borderRadius: 8,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 75,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "black",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    // flexDirection: "row",
    backgroundColor: "#757083",
    fontSize: 16,
    // alignItems: "center",
    // justifyContent: "center",
    // margin: 12,
    // elevation: 3,
    // borderRadius: 12,
    width: "80%",
    marginBottom: 60,
    // marginLeft: 30,
    // marginRight: 30,
    // opacity: 0.7,
  },
  box: {
    flex: 1,
    justifyContent: "space-around",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginBottom: -400,
  },
  colorBackground: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  colorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  option1: {
    backgroundColor: "#090C08",
  },
  option2: {
    backgroundColor: "#474056",
  },
  option3: {
    backgroundColor: "#8A95A5",
  },
  option4: {
    backgroundColor: "#B9C6AE",
  },
});