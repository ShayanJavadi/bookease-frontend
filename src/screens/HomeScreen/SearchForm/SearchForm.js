import React from "react";
import { View } from "react-native";
import { func } from "prop-types"
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import { styles } from "./styles";

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

SearchForm.propTypes = {
  searchTextbooks: func.isRequired,
};

export default SearchForm;
