import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialIcons } from "@expo/vector-icons";
import { string, number, shape, func } from "prop-types";
import { styles } from "./styles";

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
  buttonContainerStyle,
  bookNameStyle,
  bookEditionStyle,
  bookconditionStyle,
  // bookIsbnStyle,
  bookOwnerStyle,
  bookUniversityStyle,
  bookPriceStyle,
} = styles;

export default class SearchResultCard extends Component {
  static propTypes = {
    book: shape({
      name: string.isRequired,
      edition: string,
      condition: string.isRequired, // TODO: condition should be number and map to string
      owner: string.isRequired,
      price: number.isRequired,
      thumbnail: string.isRequired
    }).isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  onListingPress() {
    this.props.navigation.navigate("singleBook", { book: this.props.book });
  }

  renderUpperSection() {
    const {
      name,
      edition,
      condition,
    } = this.props.book;

    return (
        <View style={upperSectionWrapper}>
          <View style={upperSectionTopWrapper}>
            <Text style={bookNameStyle}>{name}</Text>
          </View>
          <View style={upperSectionBottomWrapper}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={bookEditionStyle}>Edition: {edition}</Text>
              <Text style={bookconditionStyle}>Condition: {condition}</Text>
            </View>
          </View>
        </View>
    )
  }

  renderLowerSection() {
    const {
      owner,
      price,
    } = this.props.book;

    return (
      <View style={lowerSectionWrapper}>
        <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
          <View style={lowerSectionLeftWrapper}>
            <View style={{ flex: 1 }}>
              <MaterialIcons name="account-circle" size={51} style={{ color: "#ccc" }} />
            </View>
            <View style={{ flex: 3.5, paddingBottom: 3, paddingLeft: 6 }}>
              <Text style={bookOwnerStyle}>{owner}</Text>
              <Text style={bookUniversityStyle}>Posted 3 hours ago</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={lowerSectionRightWrapper}>
          <Text style={bookPriceStyle}>${price}</Text>
          <Button
            raised
            style={{ text: buttonTextStyle, container: buttonContainerStyle }}
            text="Buy"
            onPress={() => alert("buy")}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onListingPress()}
      >
        <View style={searchResultCardWrapper}>
          {this.renderUpperSection()}
          <Image
            style={middleSectionWrapper}
            source={{ uri: this.props.book.thumbnail }}
          />
          {this.renderLowerSection()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
