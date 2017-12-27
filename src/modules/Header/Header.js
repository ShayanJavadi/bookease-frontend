import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import { Button } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const {
  headerWrapperStyle,
  headerTitleStyle
} = styles;

const renderLeftSide = (leftComponent) => {
  return leftComponent ?
  leftComponent :
  null
}

const renderRightSide = (rightComponent) => {
  return rightComponent ?
  rightComponent :
  null
}

const Header = ({ leftComponent, text, textContainerStyle, textStyle, rightComponent }) => {
  return (
    <View style={headerWrapperStyle}>
      <View style={{ flex : 1, justifyContent: "flex-start", flexDirection: "row" }}>
        {renderLeftSide(leftComponent)}
      </View>
      <View style={[{ flex : 1.4 }, textContainerStyle]}>
        <Text style={[headerTitleStyle, textStyle]}>{text ? text : "Enter Book Details"}</Text>
      </View>
      <View style={{ flex : 1, justifyContent: "flex-end", flexDirection: "row" }}>
        {renderRightSide(rightComponent)}
      </View>
    </View>
  )
}

export default Header;
