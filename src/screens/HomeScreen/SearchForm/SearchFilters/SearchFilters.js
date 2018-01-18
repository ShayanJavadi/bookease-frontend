import React from "react";
import { View, Text } from "react-native";
import ModalSelector from "react-native-modal-selector"
import { find } from "lodash";
import { MaterialIcons } from "@expo/vector-icons";
import { number, func, string } from "prop-types";
import { styles } from "./styles";
import { SEARCH_FILTERS } from "src/common/consts";

const {
  searchFilterWrapperStyle,
  filterWrapperStyle,
  filterStyle,
  filterTextStyle,
  barCodeIconStyle,
  resultsWrapperStyle,
  resultsTextStyle,
} = styles;

const createDropDownData = () => {
  return (
    SEARCH_FILTERS.reduce((searchFilters, searchFilter, currentIndex) => {
      searchFilters.push({
        key: currentIndex,
        label: searchFilter.humanizedValue,
        value: searchFilter.value
      });

      return searchFilters;
    }, [{
      key: Math.random(),
      section: true,
      label: "Filter By:",
    }])
  )
}

const SearchFilters = ({ resultsCount, onFilterChange, filterBy }) => (
  <View style={searchFilterWrapperStyle}>
    <View style={resultsWrapperStyle}>
      <Text style={resultsTextStyle}>{`${resultsCount} ${resultsCount == 1 ? "Result" : "Results"}`}</Text>
    </View>
    <View style={filterWrapperStyle}>
      <View style={filterStyle}>
        <Text style={filterTextStyle}>Filter by: {`${find(SEARCH_FILTERS, { value: filterBy }).humanizedValue}`}</Text>
      </View>
      <ModalSelector
        data={createDropDownData()}
        onChange={({ value }) => onFilterChange(value)}
      >
        <MaterialIcons name="arrow-drop-down" size={30} style={barCodeIconStyle} />
      </ModalSelector>

    </View>
  </View>
)

SearchFilters.propTypes = {
  resultsCount: number.isRequired,
  onFilterChange: func.isRequired,
  filterBy: string.isRequired,
}

export default SearchFilters;
