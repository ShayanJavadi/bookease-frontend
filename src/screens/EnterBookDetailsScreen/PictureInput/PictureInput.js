import React from "react";
import { View, Text } from "react-native";
import { func, object, string } from "prop-types";
import { styles } from "./styles";
import PictureCarousel from "./PictureCarousel";

const {
  pictureInputErrorMessageStyle,
  pictureInputHeaderTextStyle,
  pictureInputHeaderTextStyleHasErrors,
  pictureInputHorizontalRuleStyle,
  pictureInputHorizontalRuleStyleHasErrors,
} = styles;

const PicutreInput = ({ errorsMessages, images, carouselKey, onCarouselIndexChange, onPress, onDeleteImagePress }) => {
  return (
    <View>
      <View>
        <Text style={errorsMessages.bookImages ? pictureInputHeaderTextStyleHasErrors : pictureInputHeaderTextStyle}>Book Pictures*</Text>
      </View>
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
        {errorsMessages.bookImages ? <Text style={pictureInputErrorMessageStyle}>{errorsMessages.bookImages}</Text> : null}
      </View>
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
