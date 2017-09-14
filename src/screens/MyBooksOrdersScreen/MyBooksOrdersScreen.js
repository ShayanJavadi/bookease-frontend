import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const { screenStyle } = styles;

export default class MyBooksOrdersScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  
  render() {
    return (
      <View style={screenStyle}>
        <Text>My Orders</Text>
      </View>
    );
  }
}
