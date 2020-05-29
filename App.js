// eslint-disable-next-line import/no-unresolved
import 'react-native-screens';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Chat from './components/Chat';
import Start from './components/Start';


// chat screens

// navigation

const navigator = createStackNavigator({
  Start: {
    screen: Start,
    navigationOptions: {
      // hide navigation bar
      headerShown: false,
    },
  },
  Chat: { screen: Chat },
});

const navigatorContainer = createAppContainer(navigator);
// Export it as the root component
export default navigatorContainer;
