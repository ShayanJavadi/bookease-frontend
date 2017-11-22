import React, { Component } from "react";
import { number, string, func, shape } from "prop-types";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const {
  screenStyle,
  activitySpinnerStyle,
} = styles;

export default class AuthScreen extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    googleLogin: func.isRequired,
    googleAuthToken: string,
    updateCounter: number.isRequired,
  };

  componentDidMount() {
    this.props.googleLogin();
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.googleAuthToken) {
      return this.props.navigation.goBack();
    }
    else {
      //TODO: make API call here
    }
  }

  render() {
    return (
      <View style={screenStyle}>
        <ActivityIndicator
         animating={true}
         style={[styles.centering, activitySpinnerStyle]}
         size="large"
       />
      </View>
    );
  }
}
