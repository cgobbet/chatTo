import { ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component } from "react";

import Button from "apsl-react-native-button";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/background.png")}
        // source={require("../assets/dark_back.jpg")}
        style={styles.backgroundImage}>
        <Text style={styles.title}>Chatto</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Your name ...'
          />
          <Button
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate("Chat", { name: this.state.name })
            }
          >
            Start Chatting
          </Button>
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "rgba(117, 112, 131, 0.5)",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#757083",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    elevation: 3,
  },
});