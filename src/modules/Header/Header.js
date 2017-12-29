import React from "react";
import { Text, View } from "react-native";
import { node, string, object } from "prop-types";
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

Header.propTypes = {
  leftComponent: node,
  rightComponent: node,
  text: string,
  textStyle: object,
  textContainerStyle: object
}

export default Header;
