import React, { Component } from "react";
import { View } from "react-native";
import { func, number } from "prop-types"
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import { styles } from "./styles";

const { searchFormWrapperStyle } = styles;

export default class SearchForm extends Component {
  static propTypes = {
    searchTextbooks: func.isRequired,
    resultsCount: number.isRequired,
  };

  state = {
    filterBy: "relevance",
  }

  render() {
    const { searchTextbooks, resultsCount } = this.props;

    const textbookSearch = debounce(text => {
      return searchTextbooks({ query: text, orderBy: this.state.filterBy });
    }, 250);

    return (
      <View style={searchFormWrapperStyle}>
        <SearchBar
          search={textbookSearch}
          filterBy={this.state.filterBy}
        />
        <SearchFilters
          resultsCount={resultsCount}
          onFilterChange={(filterBy) => this.setState({ filterBy })}
          filterBy={this.state.filterBy}
        />
      </View>
    )
  }
}
