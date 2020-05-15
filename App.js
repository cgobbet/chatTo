import 'react-native-screens';

import { StyleSheet, Text, View } from "react-native";

import Chat from "./components/Chat";
import React from "react";
import Start from "./components/Start";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const navigator = createStackNavigator({
  Start: { screen: Start },
  Chat: { screen: Chat },
});

const navigatorContainer = createAppContainer(navigator);
// Export it as the root component
export default navigatorContainer;