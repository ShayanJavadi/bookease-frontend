import React from "react";
import { View, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { func, object, number } from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const {
  carouselSlidesWrapperStyle,
  carouselDeleteButtonWrapperStyle,
} = styles;

const CarouselSlide = ({ image, onPress, onDeleteImagePress, index }) => {
  return (
    <View key={index} style={carouselSlidesWrapperStyle}>
      <TouchableOpacity onPress={onDeleteImagePress} style={carouselDeleteButtonWrapperStyle}>
        <MaterialCommunityIcons name="close-circle-outline" size={25} style={{ color: "#fff" }}/>
      </TouchableOpacity>
      <TouchableHighlight
        style={carouselSlidesWrapperStyle}
        onPress={onPress}
      >
        <Image
          style={{ flex: 1 }}
          source={{ uri: image.uri || image.thumbnail  }}
        />
      </TouchableHighlight>
    </View>
  );
}

CarouselSlide.propTypes = {
  image: object.isRequired,
  onPress: func.isRequired,
  onDeleteImagePress: func.isRequired,
  index: number.isRequired,
}

export default CarouselSlide;
