import React from "react";
import { View, Image, TouchableOpacity, TouchableHighlight } from "react-native";
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

const renderCarouselSlides = (images, onPress) => {
  return images.map((image, index) => (
      <TouchableHighlight style={{ flex: 1 }} key={index} onPress={onPress}>
        <Image
          style={bookImageStyle}
          source={{ uri: image.thumbnail }}
        />
      </TouchableHighlight>
  ));
}

const renderPictureCarousel = (images, onPress, onCarouselIndexChange) => {
  return (
      <Swiper
        loop={false}
        horizontal
        dotStyle={{ backgroundColor: "rgba(0,0,0,.7)" }}
        activeDotColor="#ff003d"
        showsPagination={true}
        showsButtons={false}
        style={{ height: 300, zIndex: 99999 }}
        onIndexChanged={onCarouselIndexChange}
      >
        {renderCarouselSlides(images, onPress)}
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

const renderOverlayIcons = (isUserOwner, buyRequestCount, navigation, onBookmarkIconPress, onDeleteIconPress, textbook) => {
  if (isUserOwner) {
    return (
      <View style={iconsWrapperStyle}>
        {renderBackButton(navigation)}
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <TouchableOpacity onPress={onDeleteIconPress}>
            <MaterialCommunityIcons size={30} color="#fff" name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={iconsWrapperStyle}>
      {renderBackButton(navigation)}
      <TouchableOpacity onPress={onBookmarkIconPress}>
        <MaterialCommunityIcons 
          size={30}
          color="#fff"
          name={textbook.isBookmarkedByCurrentUser ? "heart" : "heart-outline"}
        />
      </TouchableOpacity>
    </View>
  )


  // TODO: have option to share listing on social media if there are no buy requests && user is book owner

}

const BookImages = ({ 
  isUserOwner,
  buyRequestCount,
  navigation,
  textbook,
  onPress,
  onCarouselIndexChange,
  onBookmarkIconPress,
  onDeleteIconPress,
}) => (
  <View style={bookImageWrapperStyle}>
    {renderPictureCarousel(textbook.images, onPress, onCarouselIndexChange)}
    {renderOverlayIcons(isUserOwner, buyRequestCount, navigation, onBookmarkIconPress, onDeleteIconPress, textbook)}
    <Chip
      text={`\$${textbook.price}`}
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
  onPress: func,
  onBookmarkIconPress: func.isRequired,
  onDeleteIconPress: func.isRequired,
  onCarouselIndexChange: number,
};

export default BookImages;
