import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { node, number } from "prop-types";

const createStyles = (height) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const STICKY_BUTTON_CONTAINER_HEIGHT = height ? height : 70;

  return StyleSheet.create({
    containerStyle: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      position: "absolute",
      top: SCREEN_HEIGHT - STICKY_BUTTON_CONTAINER_HEIGHT,
      minHeight: STICKY_BUTTON_CONTAINER_HEIGHT,
      width: SCREEN_WIDTH,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
      zIndex: 9999,
    },
  });
}

const FloatingBottomContainer = ({ children, height = undefined }) => {
  const { containerStyle } = createStyles(height);

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

FloatingBottomContainer.propTypes = {
  children: node.isRequired,
  height: number,
};

export default FloatingBottomContainer;
