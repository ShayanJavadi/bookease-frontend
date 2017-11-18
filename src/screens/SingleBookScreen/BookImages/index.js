import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { styles } from "./styles";

const {
  bookImageWrapperStyle,
  bookImageStyle,
  favoriteButtonWrapperStyle,
  priceChipWrapperStyle,
  priceChipStyle,
  bookImageLinearGradientStyle,
} = styles;

const BookImages = (props) => (
  <View style={bookImageWrapperStyle}>
    <Image
      style={bookImageStyle}
      source={{ uri: props.textbook.thumbnail }}
    />
    <TouchableOpacity style={favoriteButtonWrapperStyle}>
        <MaterialCommunityIcons size={30} color="#fff" name="heart-outline" />
    </TouchableOpacity>
    <View style={priceChipWrapperStyle}>
      <Text style={priceChipStyle}>${props.textbook.price}</Text>
    </View>
    <LinearGradient
     colors={["rgba(0,0,0,0.6)", "transparent"]}
     style={bookImageLinearGradientStyle}
   />
  </View>
);

BookImages.propTypes = {
  textbook: object.isRequired,
};

export default BookImages;
