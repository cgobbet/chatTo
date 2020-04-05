import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";

import Button from "apsl-react-native-button";

// import custom buttons

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" }; // creates state "name"
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/background.png")}
        // source={require("../assets/dark_back.jpg")}
      >
        <Text style={styles.title}>ChatTo</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Your name ...'
          />
        </View>
        <View style={styles.box}>
          <Text>Choose a background color:</Text>
          <View style={styles.colorBackground}>
            <TouchableOpacity
              style={[styles.option1, styles.colorIcon]}
              // onPress={this.onPress}
            />
            <TouchableOpacity
              style={[styles.option2, styles.colorIcon]}
              // onPress={this.onPress}
            />
            <TouchableOpacity
              style={[styles.option3, styles.colorIcon]}
              // onPress={this.onPress}
            />
            <TouchableOpacity
              style={[styles.option4, styles.colorIcon]}
              // onPress={this.onPress}
            />
          </View>
        </View>
        <Button
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate("Chat", { name: this.state.name })
          }
        >
          Start Chatting
        </Button>
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
    height: "44%",
    width: "88%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 50,
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
    color: "rgba(117, 112, 131, 0.5)",
    // width: "88%",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#757083",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    elevation: 3,
    borderRadius: 12,
  },
  box: {
    flex: 1,
    justifyContent: "space-around",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorBackground: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  colorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
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