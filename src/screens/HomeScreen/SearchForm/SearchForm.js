import React from "react";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import { styles } from "./styles";
import { debounce } from "lodash";

const { searchFormWrapperStyle } = styles;

const SearchForm = ({ searchTextbooks }) => {
  const textbookSearch = debounce(text => {
    return searchTextbooks({ query: text });
  }, 250);

  return (
    <View style={searchFormWrapperStyle}>
      <SearchBar
        search={textbookSearch}
      />
      <SearchFilters />
    </View>
  )
};

export default SearchForm;
