import React from "react";
import { TextInput, View } from "react-native";
import { func, string, shape } from "prop-types";
import { styles } from "./styles";

const {
  inputStyle,
} = styles;

const FormTextInput = (props) => {
  const { input, ...inputProps } = props;

  return (
    <View style={{ flex: 1 }}>
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
};

FormTextInput.propTypes = {
  input: shape({
    onChange: func,
    onBlur: func,
    onFocus: func,
    value: string
  })

};

export default FormTextInput;
