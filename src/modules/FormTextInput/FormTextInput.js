import React from "react";
import { TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationActions } from 'react-navigation'
import { styles } from "./styles";

const {
  backButtonWrapperStyle,
  backButtonTextStyle,
  backButtonIconStyle,
  inputValidStyle,
  inputInvalidStyle,
  inputStyle
} = styles;


export default function FormTextInput(props) {
  const { input, meta, ...inputProps } = props;
  const validationStyles = meta.touched && !meta.active
    ? meta.valid ? styles.valid : styles.invalid
    : null;

  return (
    <View style={{ flex: 1}}>
      <TextInput
        placeholderTextColor="#ccc"
        style={inputStyle}
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
}
