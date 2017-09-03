import React, {Component} from "react";
import {View} from "react-native";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import styles from "./styles";

const {searchFormWrapperStyle} = styles;

export default class SearchForm extends Component {
  render() {
    return (
      <View style={searchFormWrapperStyle}>
        <SearchBar />
        <SearchFilters />
      </View>
    );
  }
}
