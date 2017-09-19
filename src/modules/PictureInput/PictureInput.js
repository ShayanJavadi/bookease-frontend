import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const {
  pictureInputWrapperStyle,
  pictureInputStyle,
} = styles;

export default class PictureInput extends Component {
  render() {
    return (
      <View style={pictureInputWrapperStyle}>
        <TouchableOpacity style={pictureInputStyle}>
          <MaterialCommunityIcons name="camera" size={50} style={{ color: "#ccc" }} />
        </TouchableOpacity>
      </View>
    );
  }
}
