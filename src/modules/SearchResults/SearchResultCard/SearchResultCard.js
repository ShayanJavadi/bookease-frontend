import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import { styles } from './styles';

const {
  searchResultCardWrapper,
  upperSectionWrapper,
  upperSectionTopWrapper,
  upperSectionBottomWrapper,
  middleSectionWrapper,
  lowerLowerWrapper,
  buttonTextStyle,
  bookNameStyle,
  bookEditionStyle,
  bookCondititonStyle,
  bookIsbnStyle,
  bookOwnerStyle,
  bookUniversityStyle,
  bookPriceStyle
} = styles;

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
      <View style={searchResultCardWrapper}>
        <View style={upperSectionWrapper}>
          <View style={upperSectionTopWrapper}>
            <Text style={bookNameStyle}>{name}</Text>
          </View>
          <View style={upperSectionBottomWrapper}>
            <Text style={bookEditionStyle}>{edition}</Text>
            <Text style={bookCondititonStyle}>{condititon}</Text>
            <Text style={bookIsbnStyle}>{isbn}</Text>
          </View>
        </View>
        <View style={middleSectionWrapper}>
        </View>
        <View style={lowerLowerWrapper}>
          <View>
            <Text style={bookOwnerStyle}>{owner}</Text>
            <Text style={bookUniversityStyle}>{university}</Text>
          </View>
          <View>
            <Text style={bookPriceStyle}>{price}</Text>
            <Button
              raised
              primary
              style={{text: buttonTextStyle}}
              text="Buy"
            />
          </View>
        </View>
      </View>
    )
  }
}
