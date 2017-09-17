import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { styles } from "./styles";

const {
  backButtonWrapperStyle,
  backButtonTextStyle,
  backButtonIconStyle,
} = styles;

export default class BackButton extends Component {

  render() {
    const { navigation, buttonText } = this.props;
    return (
      <TouchableOpacity
        style={backButtonWrapperStyle}
        onPress={() => navigation.dispatch(NavigationActions.back())}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} style={backButtonIconStyle} />
        <Text style={backButtonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}
