import 'react-native-screens';

// chat screens
import Chat from "./components/Chat";
import Start from "./components/Start";
//navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const navigator = createStackNavigator({
	Start: {
		screen: Start,
		navigationOptions: {
			//hide navigation bar
			headerShown: false,
		},
	},
	Chat: { screen: Chat },
});

const navigatorContainer = createAppContainer(navigator);
// Export it as the root component
export default navigatorContainer;