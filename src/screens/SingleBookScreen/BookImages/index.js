import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { object, bool, number, shape, func } from "prop-types";
import BackButton from "src/modules/BackButton";
import Chip from "src/modules/Chip";
import { styles } from "./styles";

const {
  bookImageWrapperStyle,
  bookImageStyle,
  iconsWrapperStyle,
  priceChipWrapperStyle,
  priceChipTextStyle,
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

const renderBackButton = (navigation) => {
  return (
    <BackButton
      navigation={navigation}
      style={{ paddingLeft: 0 }}
    />
  )
}

const renderOverlayIcons = (isUserOwner, buyRequestCount, navigation) => {
  if (isUserOwner) {
    return (
      <View style={iconsWrapperStyle}>
        {renderBackButton(navigation)}
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => alert("share")}>
            <MaterialCommunityIcons size={30} color="#fff" name="archive" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("share")}>
            <MaterialCommunityIcons size={30} color="#fff" name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={iconsWrapperStyle}>
      {renderBackButton(navigation)}
      <TouchableOpacity onPress={() => alert("favorite")}>
        <MaterialCommunityIcons size={30} color="#fff" name="heart-outline" />
      </TouchableOpacity>
    </View>
  )


  // TODO: have option to share listing on social media if there are no buy requests && user is book owner

}

const BookImages = ({ isUserOwner, buyRequestCount, navigation, textbook: { price, images } }) => (
  <View style={bookImageWrapperStyle}>
    {renderPictureCarousel(images)}
    {renderOverlayIcons(isUserOwner, buyRequestCount, navigation)}
    <Chip
      text={`\$${price}`}
      styles={{ containerStyle: priceChipWrapperStyle, textStyle: priceChipTextStyle }}
    />
    <LinearGradient
     colors={["rgba(0,0,0,0.6)", "transparent"]}
     style={bookImageLinearGradientStyle}
   />
  </View>
);

BookImages.propTypes = {
  textbook: object.isRequired,
  isUserOwner: bool.isRequired,
  buyRequestCount: number.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
};

export default BookImages;
