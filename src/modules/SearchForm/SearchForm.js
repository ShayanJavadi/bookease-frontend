import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';

export default class SearchForm extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#999'}}>
        <SearchBar />
        <SearchFilters />
      </View>
    )
  }
}
