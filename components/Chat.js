import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Chat extends Component {
    state = {
      messages: [],
    };
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.state.params.name,
  //     style: navigation.state.params.background,
  //   };
  // };
  componentDidMount() { // set the state with a static message
    this.setState({
			messages: [
				//  each message requires an ID, a creation date, and a user object
				{
					_id: 1,
					text: 'Hello Developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
				},
				{
					_id: 2,
					text: `${this.props.navigation.state.params.name} have just joined the chat`,
					createdAt: new Date(),
					system: true,
				},
			],
		});
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#1E90FF',
					},
				}}
			/>
		);
  }


  render() {
    return (
			<View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
			>
				<GiftedChat
					style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
					}}
				/>
				{/* <Text style={{ color: '#FFFFFF' }}>Chat Screen</Text> */}
			</View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});