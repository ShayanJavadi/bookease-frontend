import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { updateFocus, getCurrentRouteKey } from 'react-navigation-is-focused-hoc';
import Provider from './src/store';
import createMainNavigator from './src/router';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import uiTheme from 'src/common/styles/uiTheme';
import SessionContainer from 'src/screens/SessionContainer';

export default class App extends Component {
  state = {
    isAppReady: false,
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    });

    const isFirstRun = (await AsyncStorage.getItem("hasRunBefore")) !== 'true';
    await AsyncStorage.setItem("hasRunBefore", "true");

    this.setState({
      isAppReady: true,
      isFirstRun,
     });
  }

  render() {
    if (!this.state.isAppReady) {
      // TODO: loading animation goes here
      return (null);
    }
    else {
      const Navigator = createMainNavigator(this.state.isFirstRun);

      return (
        <Provider>
          <SessionContainer>
            <ThemeProvider uiTheme={uiTheme}>
              <Navigator
                onNavigationStateChange={(prevState, currentState) => { updateFocus(currentState) }}
              />
            </ThemeProvider>
            <StatusBar
              barStyle="light-content"
            />
          </SessionContainer>
        </Provider>
      );
    }
  }
}
