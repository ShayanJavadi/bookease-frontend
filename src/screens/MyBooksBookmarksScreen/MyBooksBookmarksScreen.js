import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const { screenStyle } = styles;

export default class MyBooksBookmarksScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={screenStyle}>
        <Text>My Bookmarks</Text>
      </View>
    );
  }
}
