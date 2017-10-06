import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { func, shape, string } from "prop-types";
import { styles } from "./styles";
const {
  backButtonWrapperStyle,
  backButtonTextStyle,
  backButtonIconStyle,
} = styles;

export default class BackButton extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    buttonText: string
  };

  render() {
    const { navigation, buttonText } = this.props;
    return (
      <TouchableOpacity
        style={backButtonWrapperStyle}
        onPress={() => navigation.dispatch(NavigationActions.back())}
      >
        <MaterialIcons name="arrow-back" size={24} style={backButtonIconStyle} />
        <Text style={backButtonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}
