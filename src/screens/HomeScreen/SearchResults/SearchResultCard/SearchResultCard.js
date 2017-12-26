import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialIcons } from "@expo/vector-icons";
import { string, number, shape, func } from "prop-types";
import { toOrdinal, mapNumberToConditions, getRelativeTime } from "src/common/lib";
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
  bookOwnerStyle,
  bookCreatedAtStyle,
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

  state = {
    isImageLoading: true,
  }

  onListingPress() {
    this.props.navigation.navigate("singleBook", { textbookId: this.props.book.id });
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
              <Text style={bookconditionStyle}>Condition: {mapNumberToConditions(condition)}</Text>
            </View>
          </View>
        </View>
    )
  }

  renderImage() {
    return (
      <View style={{ flex: 11 }}>
        <View
          style={
            this.state.isImageLoading ? [middleSectionWrapper, { justifyContent: "center", alignItems: "center" }] : { height: 0, opacity: 0 }
          }
        >
          <ActivityIndicator
            size="large"
            color="#222"
          />
        </View>
        <Image
          style={
            this.state.isImageLoading ? { flex: 0.1 } : middleSectionWrapper
          }
          source={{ uri: this.props.book.images[0].thumbnail }}
          onLoad={() => this.setState({ isImageLoading: false })}
          onLoadStart={() => this.setState({ isImageLoading: true })}
        />
      </View>
    )
  }

  renderLowerSection() {
    const {
      price,
      createdAt,
    } = this.props.book;

    return (
      <View style={lowerSectionWrapper}>
        <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
          <View style={lowerSectionLeftWrapper}>
            <View style={{ flex: 1 }}>
              <MaterialIcons name="account-circle" size={51} style={{ color: "#ccc" }} />
            </View>
            <View style={{ flex: 3.5, paddingBottom: 3, paddingLeft: 6 }}>
              <Text style={bookOwnerStyle}>Joh </Text>
              <Text style={bookCreatedAtStyle}>{getRelativeTime(createdAt, true)}</Text>
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
          {this.renderImage()}
          {this.renderLowerSection()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
