import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SearchResultCard extends Component {

  render() {
    const {
      name,
      edition,
      condititon,
      isbn,
      owner,
      university,
      price,
    } = this.props.book;

    return (
      <View style={{ flex: 1, height: 300 }}>
        <View style={{ flex: 2, backgroundColor: '#222' }}>
          <Text>{name}</Text>
        </View>
        <View style={{ flex: 8, backgroundColor: '#ccc' }}>
        </View>
        <View style={{ flex: 2, backgroundColor: '#eee'}}>
        </View>
      </View>
    )
  }
}
