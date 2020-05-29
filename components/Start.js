/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";

import KeyboardSpacer from "react-native-keyboard-spacer";

require("firebase/firestore");

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      // color: '',
      // behavior: 'position'
    }; // creates state for"name" and "color"
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        // eslint-disable-next-line global-require
        source={require("../assets/background.png")}
      >
        <Text style={styles.title}>ChatTo</Text>

        {/* Container for TextInput */}
        <View style={styles.container}>
          <View style={styles.box}>
            {/* Name to be displayed in header */}

            <TextInput
              style={[styles.textInput, styles.alignment]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.alignment}>Choose a background color</Text>

            {/* Color options */}
            <View style={styles.pickedColor}>
              <TouchableOpacity
                onPress={() => this.setState({ selectedColor: "#090C08" })}
                style={[styles.button1, styles.colorOption]}
              />

              <TouchableOpacity
                onPress={() => this.setState({ selectedColor: "#474056" })}
                style={[styles.button2, styles.colorOption]}
              />
              <TouchableOpacity
                onPress={() => this.setState({ selectedColor: "#8A95A5" })}
                style={[styles.button3, styles.colorOption]}
              />
              <TouchableOpacity
                onPress={() => this.setState({ selectedColor: "#B9C6AE" })}
                style={[styles.button4, styles.colorOption]}
              />
            </View>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              accessible
              accessibilityLabel="More options"
              accessibilityHint="Let’s you choose to send an image or your geolocation."
              accessibilityRole="button"
              style={[styles.chatButton, styles.alignment]}
              onPress={() => {
                // eslint-disable-next-line react/prop-types
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  selectedColor: this.state.selectedColor,
                });
              }}
            >
              <Text style={[styles.buttonText, styles.alignment]}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
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
    width: "88%",
    height: "50%",
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
  pickedColor: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chatButton: {
    height: "50%",
    backgroundColor: "#757083",
    width: "88%",
    alignItems: "center",
    // borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    paddingTop: 17,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button1: {
    backgroundColor: "#090C08",
  },
  button2: {
    backgroundColor: "#474056",
  },
  button3: {
    backgroundColor: "#8A95A5",
  },
  button4: {
    backgroundColor: "#B9C6AE",
  },
  box: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  alignment: {
    alignSelf: "center",
  },
});
