import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { string, object } from "prop-types";
import uiTheme from "src/common/styles/uiTheme";

const { palette: { primaryColor } } = uiTheme;

const Chip = ({ text, styles = {} }) => {
  const { priceChipWrapperStyle, priceChipStyle } = interalStyles;
  const { containerStyle, textStyle } = styles;

  return (
    <View style={[priceChipWrapperStyle, containerStyle]}>
      <Text style={[priceChipStyle, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

Chip.propTypes = {
  text: string.isRequired,
  styles: object
};

const interalStyles = StyleSheet.create({
  priceChipWrapperStyle: {
    position: "absolute",
    bottom: 5,
    left: 9,
    borderRadius: 33,
    minWidth: 33,
    borderWidth: 3,
    borderColor: primaryColor,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    height: 18,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    flex: 1,
  },
  priceChipStyle: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    paddingRight: 3,
  },
});


export default Chip;
