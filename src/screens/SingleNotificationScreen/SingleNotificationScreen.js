import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const {
  screenStyle,
} = styles;

export default class SingleNotificationScreen extends Component {
  render() {
    return (
      <View style={screenStyle}>
        <Text>SingleNotification</Text>
      </View>
    );
  }
}
