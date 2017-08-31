import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { styles } from './styles';

const {
  searchBarWrapperStyle,
  inputWrapperStyle,
  inputStyle,
  searchIconStyle,
  barCodeIconStyle
} = styles;

export default class SearchBar extends Component {
  render() {
    return (
      <View style={searchBarWrapperStyle}>
        <View style={inputWrapperStyle}>
          <EvilIcons name="search" size={23} style={searchIconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Search for textbooks"
            underlineColorAndroid="transparent"
           />
           <FontAwesome name="barcode" size={30} style={barCodeIconStyle} />
        </View>
      </View>
    )
  }
}
