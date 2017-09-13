import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";

const {
  searchFilterWrapperStyle,
  filterWrapperStyle,
  filterStyle,
  filterTextStyle,
  searchIconStyle,
  barCodeIconStyle,
  resultsWrapperStyle,
  resultsTextStyle
} = styles;

export default class SearchFilters extends Component {
  render() {
    return (
      <View style={searchFilterWrapperStyle}>
        <View style={resultsWrapperStyle}>
          <Text style={resultsTextStyle}>33 Results</Text>
        </View>
        <View style={filterWrapperStyle}>
          <View style={filterStyle}>
            <Text style={filterTextStyle}>Filter</Text>
          </View>
          <MaterialIcons name="arrow-drop-down" size={30} style={barCodeIconStyle} />
        </View>
      </View>
    );
  }
}
