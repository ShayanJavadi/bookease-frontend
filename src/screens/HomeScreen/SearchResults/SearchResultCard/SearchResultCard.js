import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialIcons } from "@expo/vector-icons";
import { string, number, shape, func } from "prop-types";
import { capitalize } from "lodash";
import { toOrdinal, mapNumberToConditions, getRelativeTime } from "src/common/lib";
import { styles } from "./styles";
import ProgressiveImage from "src/modules/ProgressiveImage";
import Chip from "src/modules/Chip";

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
  bookOwnerStyle,
  bookCreatedAtStyle,
  priceChipWrapperStyle,
  priceChipTextStyle
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

  state = {
    isImageLoading: true,
  }

  onListingPress() {
    const { navigation, book } = this.props;

    navigation.navigate("singleBook", { textbookId: book.id });
  }

  onBuyButtonPress() {
    const { navigation, book } = this.props;

    navigation.navigate("buyRequestScreen", { textbookId: book.id,  context: "home" });
  }

  renderUpperSection() {
    const {
      title,
      edition,
      condition,
    } = this.props.book;

    return (
        <View style={upperSectionWrapper}>
          <View style={upperSectionTopWrapper}>
            <Text style={bookNameStyle}>{title}</Text>
          </View>
          <View style={upperSectionBottomWrapper}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={bookEditionStyle}>Edition: {toOrdinal(edition)}</Text>
              <Text style={bookconditionStyle}>Condition: {capitalize(mapNumberToConditions(condition))}</Text>
            </View>
          </View>
        </View>
    )
  }

  renderImage() {
    const uri = this.props.book.images[0].thumbnail;
    const preview = uri.replace(/(\.[\w\d_-]+)$/i, "-thumbnail$1");

    return (
        <ProgressiveImage
          preview={preview}
          uri={uri}
          containerStyle={{ flex: 11 }}
          imageStyle={middleSectionWrapper}
        />
    )
  }

  renderPriceChip() {
    return (
      <Chip
        text={`\$${this.props.book.price}`}
        styles={{ containerStyle: priceChipWrapperStyle, textStyle: priceChipTextStyle }}
      />
    )
  }

  renderLowerSection() {
    const {
      createdAt,
    } = this.props.book;

    return (
      <View style={lowerSectionWrapper}>
        <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
          <View style={lowerSectionLeftWrapper}>
            <View >
              <MaterialIcons name="account-circle" size={51} style={{ color: "#ccc" }} />
            </View>
            <View>
              <Text style={bookOwnerStyle}>Joh </Text>
              <Text style={bookCreatedAtStyle}>{getRelativeTime(createdAt, true)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={lowerSectionRightWrapper}>
          <Button
            raised
            style={{ text: buttonTextStyle, container: buttonContainerStyle }}
            text="Buy"
            onPress={() => this.onBuyButtonPress()}
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
          {this.renderImage()}
          {this.renderPriceChip()}
          {this.renderLowerSection()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
