import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
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

const renderCarouselSlides = (images) => {
  return images.map((image, index) => (
      <View style={{ flex: 1 }} key={index}>
        <Image
          style={bookImageStyle}
          source={{ uri: image.thumbnail }}
        />
      </View>
  ));
}

const renderPictureCarousel = (images) => {
  return (
      <Swiper
        loop={false}
        horizontal
        dotStyle={{ backgroundColor: "rgba(0,0,0,.7)" }}
        activeDotColor="#ff003d"
        showsPagination={true}
        showsButtons={false}
        style={{ height: 300, zIndex: 99999 }}
      >
        {renderCarouselSlides(images)}
      </Swiper>
  )
}

const BookImages = ({ textbook: { price, images } }) => (
  <View style={bookImageWrapperStyle}>
    {renderPictureCarousel(images)}
    <TouchableOpacity style={favoriteButtonWrapperStyle}>
        <MaterialCommunityIcons size={30} color="#fff" name="heart-outline" />
    </TouchableOpacity>
    <View style={priceChipWrapperStyle}>
      <Text style={priceChipStyle}>${price}</Text>
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
