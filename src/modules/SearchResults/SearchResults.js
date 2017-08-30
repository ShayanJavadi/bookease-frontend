import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SearchResultCard from './SearchResultCard';

export default class SearchResults extends Component {
  render() {
    return (
      <View style={{ flex: 6 }}>
        <SearchResultCard />
        <SearchResultCard />
        <SearchResultCard />
      </View>
    )
  }
}
