import React from "react";
import { node, object } from "prop-types";
import { View } from "react-native";

const PlaceholderView = ({ children, styles = {} }) => (
  <View style={[{ backgroundColor: "#f1f1f1", height: 10 }, styles]}>
    {children}
  </View>
);

PlaceholderView.propTypes = {
  children: node,
  styles: object
};

export default PlaceholderView;
