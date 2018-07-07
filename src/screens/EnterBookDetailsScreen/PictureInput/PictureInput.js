import React from "react";
import { View, Text } from "react-native";
import { func, object, string } from "prop-types";
import { styles, palette } from "./styles";
import PictureCarousel from "./PictureCarousel";
import ActionButton from "react-native-action-button";

const {
  pictureInputErrorMessageStyle,
  pictureInputHorizontalRuleStyle,
  pictureInputHorizontalRuleStyleHasErrors,
  pictureInputActionButtonStyle,
} = styles;

const PicutreInput = ({ errorsMessages, images, carouselKey, onCarouselIndexChange, onPress, onDeleteImagePress }) => {
  return (
    <View>
      <PictureCarousel
        images={images}
        carouselKey={carouselKey}
        onCarouselIndexChange={onCarouselIndexChange}
        onPress={onPress}
        onDeleteImagePress={onDeleteImagePress}
        errorsMessages={errorsMessages}
      />
      <View
        style={errorsMessages.bookImages ? pictureInputHorizontalRuleStyleHasErrors : pictureInputHorizontalRuleStyle}
      />
      <View>
        <Text style={pictureInputErrorMessageStyle}>{errorsMessages.bookImages}</Text>
      </View>
      <ActionButton
        buttonColor={palette.primaryColor}
        position="right"
        size={43}
        onPress={onPress}
        style={pictureInputActionButtonStyle}
      />
    </View>
  )
}

PicutreInput.propTypes = {
  errorsMessages: object.isRequired,
  images: object.isRequired,
  carouselKey: string.isRequired,
  onCarouselIndexChange: func.isRequired,
  onPress: func.isRequired,
  onDeleteImagePress: func.isRequired,
}

export default PicutreInput;
