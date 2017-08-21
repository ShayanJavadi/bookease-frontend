import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class AuthScreen extends Component {
  render() {
    return (
      <Button
        title="test"
        onPress={() => this.props.navigation.navigate('welcome')}
      />
    );
  }
}
