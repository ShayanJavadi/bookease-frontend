import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

const { screenStyle } = styles;

export default class MyBooksScreen extends Component {

  render() {
    return (
      <View style={screenStyle}>
        <Text>My BooksScreen</Text>
      </View>
    );
  }
}
