import React from "react";
import { View } from "react-native";
import { func, number } from "prop-types"
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import { styles } from "./styles";

const { searchFormWrapperStyle } = styles;

const SearchForm = ({ searchTextbooks, resultsCount }) => {
  const textbookSearch = debounce(text => {
    return searchTextbooks({ query: text });
  }, 250);

  return (
    <View style={searchFormWrapperStyle}>
      <SearchBar
        search={textbookSearch}
      />
      <SearchFilters
        resultsCount={resultsCount}
      />
    </View>
  )
};

SearchForm.propTypes = {
  searchTextbooks: func.isRequired,
  resultsCount: number.isRequired,
};

export default SearchForm;
