import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialIcons } from "@expo/vector-icons";
import { string, number, shape } from "prop-types";
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
  bookCondititonStyle,
  // bookIsbnStyle,
  bookOwnerStyle,
  bookUniversityStyle,
  bookPriceStyle,
  horizantalLineStyle,
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
    }).isRequired
  };

  render() {
    const {
      name,
      edition,
      condititon,
      owner,
      price,
      thumbnail,
    } = this.props.book;

    return (
      <View style={searchResultCardWrapper}>
        <View style={horizantalLineStyle} />
        <View style={upperSectionWrapper}>
          <View style={upperSectionTopWrapper}>
            <Text style={bookNameStyle}>{name}</Text>
          </View>
          <View style={upperSectionBottomWrapper}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={bookEditionStyle}>Edition: {edition}</Text>
              <Text style={bookCondititonStyle}>Condition: {condititon}</Text>
            </View>
          </View>
        </View>
        <Image
          style={middleSectionWrapper}
          source={{ uri: thumbnail }}
          resizeMode={"contain"}
        />
        <View style={lowerSectionWrapper}>
          <View style={lowerSectionLeftWrapper}>
            <View style={{ flex: 1 }}>
              <MaterialIcons name="account-circle" size={51} style={{ color: "#ccc" }} />
            </View>
            <View style={{ flex: 3.5, paddingBottom: 3, paddingLeft: 6 }}>
              <Text style={bookOwnerStyle}>{owner}</Text>
              <Text style={bookUniversityStyle}>Posted 3 hours ago</Text>
            </View>
          </View>
          <View style={lowerSectionRightWrapper}>
            <Text style={bookPriceStyle}>${price}</Text>
            <Button
              raised
              style={{ text: buttonTextStyle, container: buttonContainerStyle }}
              text="Buy"
            />
          </View>
        </View>
      </View>
    );
  }
}
