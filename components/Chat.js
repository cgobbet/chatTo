import { Button, Text, TextInput, View } from "react-native";
import React, { Component } from "react";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello {this.props.navigation.state.params.name}!</Text>
      </View>
    );
  }
}

// static navigationOptions = ({ navigation }) => {
//   return {
//     title: navigation.state.params.name,
//   };
// };
