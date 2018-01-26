import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-material-ui";
import { NavigationActions } from "react-navigation";
import { func, object, shape } from "prop-types";
import { styles } from "./styles";

const {
  screenStyle,
  signOutButtonTextStyle,
  signOutButtonContainerStyle
 } = styles;

export default class AccountScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    currentUser: object,
    updateUser: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  signOut() {
    this.props.updateUser(undefined);

    const closeSuccessScreenAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "mainScreen" })
      ]
    })
    return this.props.navigation.dispatch(closeSuccessScreenAction);
  }

  render() {
    return (
      <View style={screenStyle}>
        <Text>{JSON.stringify(this.props.currentUser)}</Text>
        <Button
          raised
          primary
          text="Sign Out"
          style={{ container: signOutButtonContainerStyle, text: signOutButtonTextStyle }}
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}
