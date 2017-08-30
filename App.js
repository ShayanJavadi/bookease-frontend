import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import HomeNavigator from './src/router';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import uiTheme from './src/common/styles';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ThemeProvider uiTheme={uiTheme}>
            <HomeNavigator />
          </ThemeProvider>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
