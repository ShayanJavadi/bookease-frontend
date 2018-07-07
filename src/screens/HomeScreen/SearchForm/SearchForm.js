import React, { Component } from "react";
import { View } from "react-native";
import { func, number, shape, object } from "prop-types"
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SchoolInformation from "./SchoolInformation";
import { styles } from "./styles";

const { searchFormWrapperStyle } = styles;

export default class SearchForm extends Component {
  static propTypes = {
    searchTextbooks: func.isRequired,
    resultsCount: number.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    currentStoredUser: object,
  };

  state = {
    filterBy: "relevance",
  }

  render() {
    const { searchTextbooks, navigation, currentStoredUser } = this.props;

    const textbookSearch = debounce(text => {
      return searchTextbooks({ query: text, orderBy: this.state.filterBy });
    }, 250);

    return (
      <View style={searchFormWrapperStyle}>
        <SearchBar
          search={textbookSearch}
          filterBy={this.state.filterBy}
          onFilterChange={(filterBy) => this.setState({ filterBy })}
          navigation={navigation}
        />
        <SchoolInformation
          currentStoredUser={currentStoredUser}
        />
      </View>
    )
  }
}
