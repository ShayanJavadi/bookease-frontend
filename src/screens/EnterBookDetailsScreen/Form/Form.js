import React from "react";
import { View } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import { func, object } from "prop-types";
import { styles, palette } from "./styles";
import { BOOK_CONDITIONS } from "src/common/consts";

const {
  textInputStyle,
  descriptionTextInputStyle
} = styles;

const {
  primaryColor
} = palette;

const focusNextField = (id) => {
  Form.inputs[id].focus();
}

const Form = ({ formInputValues, errorsMessages, updateFormInputValues }) => {
  const {
    bookTitle,
    bookAuthor,
    bookEdition,
    bookCondition,
    bookPrice,
    bookIsbn,
    bookDescription,
    descriptionTextInputSelected,
  } = formInputValues;

  return (
    <View style={{ flex: 4 }}>
      <TextField
        returnKeyType="next"
        error={errorsMessages.bookTitle}
        label="Book Title*"
        value={bookTitle}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookTitle) => updateFormInputValues({ bookTitle })}
        ref={ input => Form.inputs["bookTitle"] = input }
        onSubmitEditing={() => focusNextField("authors")}
      />
      <TextField
        returnKeyType="next"
        error={errorsMessages.bookAuthor}
        label="Author(s)*"
        value={bookAuthor}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookAuthor) => updateFormInputValues({ bookAuthor })}
        ref={ input => Form.inputs["authors"] = input}
        onSubmitEditing={() => focusNextField("isbn")}
      />
      <TextField
        returnKeyType="next"
        keyboardType="numeric"
        error={errorsMessages.bookIsbn}
        label="ISBN*"
        value={bookIsbn}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookIsbn) => updateFormInputValues({ bookIsbn }) }
        ref={ input => Form.inputs["isbn"] = input }
        onSubmitEditing={() => focusNextField("edition")}
      />
      <TextField
        keyboardType="numeric"
        returnKeyType="next"
        error={errorsMessages.bookEdition}
        label="Edition*"
        value={bookEdition}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookEdition) => updateFormInputValues({ bookEdition })}
        ref={ input => Form.inputs["edition"] = input }
      />
      <TextField
        returnKeyType="next"
        keyboardType="numeric"
        error={errorsMessages.bookPrice}
        label="Price*"
        value={bookPrice}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookPrice) => updateFormInputValues({ bookPrice })}
        ref={ input => Form.inputs["price"] = input }
      />
      <Dropdown
        error={errorsMessages.bookCondition}
        label="Condition*"
        data={BOOK_CONDITIONS}
        fontSize={14}
        animationDuration={120}
        tintColor={primaryColor}
        containerStyle={textInputStyle}
        onChangeText={(bookCondition) => updateFormInputValues({ bookCondition })}
        value={bookCondition}
      />
      <TextField
        error={errorsMessages.bookDescription}
        label="*Description"
        title="Provide additional information"
        value={bookDescription}
        multiline={true}
        fontSize={14}
        tintColor={primaryColor}
        containerStyle={[
          descriptionTextInputStyle, {
            borderColor: descriptionTextInputSelected || errorsMessages.bookDescription ? primaryColor : "#222",
          }
        ]}
        inputContainerStyle={{ height: 200 }}
        style={{ height: 160 }}
        characterRestriction={300}
        onChangeText={(bookDescription) => updateFormInputValues({ bookDescription })}
        onFocus={() => updateFormInputValues({ descriptionTextInputSelected: true })}
        onBlur={() => updateFormInputValues({ descriptionTextInputSelected: false })}
        ref={ input => Form.inputs["description"] = input }
      />
    </View>
  )
}

Form.inputs = {}

Form.propTypes = {
  formInputValues: object.isRequired,
  errorsMessages: object.isRequired,
  updateFormInputValues: func.isRequired,
}

export default Form;
