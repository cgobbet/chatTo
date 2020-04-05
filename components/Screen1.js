import { Button, Text, View } from "react-native";
import React, { Component } from "react";

class Screen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello Screen1!</Text>
        <Button
          title='Go to Screen 2'
          onPress={() => this.props.navigation.navigate("Screen2")}
        />
      </View>
    );
  }
}

export default Screen1;