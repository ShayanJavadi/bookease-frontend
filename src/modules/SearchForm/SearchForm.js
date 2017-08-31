import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';

export default class SearchForm extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#999', justifyContent: 'space-between', alignItems: 'center', paddingTop: 35, paddingBottom: 20 }}>
        <SearchBar />
        <SearchFilters />
      </View>
    )
  }
}
