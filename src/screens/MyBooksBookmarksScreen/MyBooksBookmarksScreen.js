import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const { screenStyle } = styles;

export default class MyBooksBookmarksScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    // you haven't bookmarked anything
    // search books
    return (
      <View style={screenStyle}>
        <Text>My Bookmarks</Text>
      </View>
    );
  }
}
