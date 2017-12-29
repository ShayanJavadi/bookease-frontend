import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { func, object, string } from "prop-types";
import Swiper from "react-native-swiper";
import ActionButton from "react-native-action-button";
import { isEmpty } from "lodash";
import { styles, palette } from "./styles";
import CarouselSlide from "./CarouselSlide";

const {
  pictureInputWrapperStyle,
  pictureInputStyle,
  pictureInputStyleHasErrors,
  pictureCarouselWrapperStyle,
  pictureCarouselStyle,
  pictureInputActionButtonStyle,
} = styles;

const {
  primaryColor
} = palette;

const renderCarouselSlides = (images, onPress, onDeleteImagePress) => {
  return images.map((image, index) => (
    <CarouselSlide
      image={image}
      index={index}
      onPress={onPress}
      onDeleteImagePress={onDeleteImagePress}
      key={index}
    />
  ))
}

const PictureCarousel = ({ errorsMessages, images, carouselKey, onCarouselIndexChange, onPress, onDeleteImagePress }) => {
  if (!isEmpty(images)) {
    return (
      <View style={pictureCarouselWrapperStyle} key={carouselKey}>
        <Swiper
          loop={false}
          horizontal
          dotStyle={{ backgroundColor: "rgba(0,0,0,.7)" }}
          activeDotColor={primaryColor}
          showsPagination={true}
          showsButtons={false}
          style={pictureCarouselStyle}
          onIndexChanged={onCarouselIndexChange}
          ref={component => PictureCarousel.swiper = component}
        >
          {renderCarouselSlides(images, onPress, onDeleteImagePress)}
        </Swiper>
        <ActionButton
          buttonColor={primaryColor}
          position="right"
          size={43}
          onPress={onPress}
          style={pictureInputActionButtonStyle}
        />
      </View>
    )
  }

  return (
    <View style={pictureInputWrapperStyle}>
      <TouchableOpacity
        style={errorsMessages.bookImages ? pictureInputStyleHasErrors : pictureInputStyle}
        onPress={onPress}
      >
        <MaterialCommunityIcons name="camera" size={50} style={{ color: "#bbb" }}/>
      </TouchableOpacity>
      <ActionButton
        buttonColor={primaryColor}
        position="right"
        size={43}
        onPress={onPress}
        style={pictureInputActionButtonStyle}
      />
    </View>
  )
}

PictureCarousel.propTypes = {
  errorsMessages: object.isRequired,
  images: object.isRequired,
  carouselKey: string.isRequired,
  onCarouselIndexChange: func.isRequired,
  onPress: func.isRequired,
  onDeleteImagePress: func.isRequired,
}

export default PictureCarousel;
