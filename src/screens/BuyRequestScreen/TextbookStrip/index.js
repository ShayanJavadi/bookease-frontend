import React from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { getRelativeTime } from "src/common/lib";
import { styles } from "./styles";

const {
  screenStyle,
  containerStyle,
  imageContainerStyle,
  textContainerStyle,
  titleTextStyle,
  priceTextStyle,
} = styles;

const renderImage = (images) => {
  const uri = images[0].thumbnail;
  
  return (
    <View style={imageContainerStyle}>
      <Image
        style={{ flex: 1 }}
        source={{ uri }}
      />
    </View>
  )
}

const renderText = (price, title) => {
  return (
    <View style={textContainerStyle}>
      <Text style={titleTextStyle}>{title}</Text>
      <Text style={priceTextStyle}>${price}</Text>
    </View>
  )
}

const TextbookStrip = ({ textbook: { images, price, title }, onPress }) => (
  <TouchableWithoutFeedback style={screenStyle} onPress={onPress}>
    <View style={containerStyle}>
      {renderImage(images)}
      {renderText(price, title)}
    </View>
  </TouchableWithoutFeedback>
);

TextbookStrip.propTypes = {
  textbook: object.isRequired,
};

export default TextbookStrip;
