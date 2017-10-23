import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { func, shape, string, bool, object } from "prop-types";
import { styles } from "./styles";
const {
  backButtonWrapperStyle,
  backButtonHeaderLessWrapperStyle,
  backButtonTextStyle,
  backButtonIconStyle,
} = styles;

export default class BackButton extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    buttonText: string,
    onPress: func,
    headerLess: bool,
    style: object,
  };

  onBackButtonPress() {
    const { navigation, onPress } = this.props;

    if (!onPress) {
      return () => navigation.dispatch(NavigationActions.back())
    }

    return onPress;
  }

  render() {
    const { headerLess, buttonText, style } = this.props;

    return (
      <TouchableOpacity
        style={[headerLess ? backButtonHeaderLessWrapperStyle : backButtonWrapperStyle, style]}
        onPress={this.onBackButtonPress()}
      >
        <MaterialIcons name="arrow-back" size={24} style={backButtonIconStyle} />
        <Text style={backButtonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}
