import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
      style: navigation.state.params.background,
    };
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.state.params.color },
        ]}
      >
        <Text style={{ color: "#FFFFFF" }}>Chat Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});