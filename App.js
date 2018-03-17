import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import { updateFocus } from "react-navigation-is-focused-hoc"
import Provider from "./src/store"
import createMainNavigator from "./src/router"
import { ThemeProvider } from "react-native-material-ui"
import uiTheme from "src/common/styles/uiTheme"
import loadFonts from "./src/common/lib/loadFonts"
import determineFirstRun from "./src/common/lib/isFirstRun"
import markFirstRun from "./src/common/lib/markFirstRun"
import firebase from "src/common/lib/firebase"

export default class App extends Component {
  state = {
    isAppReady: false,
  }

  async componentWillMount() {
    await firebase()

    await loadFonts()
    const isFirstRun = await determineFirstRun()
    await markFirstRun()

    this.setState({
      isAppReady: true,
      isFirstRun,
    })
  }

  updateFocus = (prevState, currentState) => updateFocus(currentState);

  render() {
    if (!this.state.isAppReady) {
      // TODO: loading animation goes here
      return (null)
    }
    const Navigator = createMainNavigator({ isFirstRun: this.state.isFirstRun })

    return (
        <Provider>
          <View style={styles.container}>
            <ThemeProvider uiTheme={uiTheme}>
              <Navigator
                onNavigationStateChange={this.updateFocus}
              />
            </ThemeProvider>
            <StatusBar
              barStyle="light-content"
            />
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
})
