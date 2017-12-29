import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { number } from "prop-types";
import { styles } from "./styles";

const {
  searchFilterWrapperStyle,
  filterWrapperStyle,
  filterStyle,
  filterTextStyle,
  barCodeIconStyle,
  resultsWrapperStyle,
  resultsTextStyle,
} = styles;

const SearchFilters = ({ resultsCount }) => (
  <View style={searchFilterWrapperStyle}>
    <View style={resultsWrapperStyle}>
      <Text style={resultsTextStyle}>{`${resultsCount} Results`}</Text>
    </View>
    <View style={filterWrapperStyle}>
      <View style={filterStyle}>
        <Text style={filterTextStyle}>Filter</Text>
      </View>
      <MaterialIcons name="arrow-drop-down" size={30} style={barCodeIconStyle} />
    </View>
  </View>
)

SearchFilters.propTypes = {
  resultsCount: number.isRequired,
}

export default SearchFilters;
