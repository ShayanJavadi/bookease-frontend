import React from "react";
import { Image, StyleSheet } from "react-native";
import { number, string, object } from "prop-types";

const createStyles = (size) => {
  return StyleSheet.create({
    imageStyle: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  });
}

const Avatar = ({ size, styles = {}, uri }) => {
  const { imageStyle } = createStyles(size);

  return (
    <Image
      style={[ imageStyle, styles ]}
      source={{ uri: uri }}
    />
  );
};

Avatar.propTypes = {
  size: number.isRequired,
  styles: object,
  uri: string.isRequired
};

export default Avatar;
