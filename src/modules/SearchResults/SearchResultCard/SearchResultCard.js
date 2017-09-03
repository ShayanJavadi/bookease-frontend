import React, {Component} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-material-ui";
import {styles} from "./styles";

const {
  searchResultCardWrapper,
  upperSectionWrapper,
  upperSectionTopWrapper,
  upperSectionBottomWrapper,
  middleSectionWrapper,
  lowerSectionWrapper,
  lowerSectionLeftWrapper,
  lowerSectionRightWrapper,
  buttonTextStyle,
  bookNameStyle,
  bookEditionStyle,
  bookCondititonStyle,
  bookIsbnStyle,
  bookOwnerStyle,
  bookUniversityStyle,
  bookPriceStyle,
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
            <Text style={bookEditionStyle}>Edition: {edition}</Text>
            <Text style={bookCondititonStyle}>Condition: {condititon}</Text>
            {// <Text style={bookIsbnStyle}>{isbn}</Text>
            }
          </View>
        </View>
        <View style={middleSectionWrapper} />
        <View style={lowerSectionWrapper}>
          <View style={lowerSectionLeftWrapper}>
            <Text style={bookOwnerStyle}>{owner}</Text>
            <Text style={bookUniversityStyle}>{university}</Text>
          </View>
          <View style={lowerSectionRightWrapper}>
            <Text style={bookPriceStyle}>${price}</Text>
            <Button
              raised
              primary
              style={{text: buttonTextStyle, container: {backgroundColor: "#222", width: 65}}}
              text="Buy"
            />
          </View>
        </View>
      </View>
    );
  }
}
