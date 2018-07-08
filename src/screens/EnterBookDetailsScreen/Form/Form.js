import React, { Component } from "react";
import ReactNative, { View } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import { func, object } from "prop-types";
import { omit, findLastKey } from "lodash";
import { styles, palette } from "./styles";
import { BOOK_CONDITIONS } from "src/common/consts";

const {
  textInputStyle,
  descriptionTextInputStyle
} = styles;

const {
  primaryColor
} = palette;

export default class form extends Component {
  static propTypes = {
    formInputValues: object.isRequired,
    errorsMessages: object.isRequired,
    updateFormInputValues: func.isRequired,
    scrollView: object.isRequired,
  }
  inputs = {}

  UNSAFE_componentWillReceiveProps({ errorsMessages }) {
    if (errorsMessages.formHasErrors) {
      const errors = omit(errorsMessages, ["formHasErrors"]);
      const inputId = findLastKey(errors);
      this.focusField(inputId);
    }
  }

  focusField = (id) => {
    this.props.scrollView.scrollToFocusedInput(ReactNative.findNodeHandle(this.inputs[id]));
  }

  render() {
    const { formInputValues, errorsMessages, updateFormInputValues } = this.props;
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
          ref={ input => this.inputs["bookTitle"] = input }
          onSubmitEditing={() => this.focusField("bookAuthor")}
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
          ref={ input => this.inputs["bookAuthor"] = input}
          onSubmitEditing={() => this.focusField("bookIsbn")}
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
          ref={ input => this.inputs["bookIsbn"] = input }
          onSubmitEditing={() => this.focusField("bookEdition")}
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
          ref={ input => this.inputs["bookEdition"] = input }
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
          ref={ input => this.inputs["bookPrice"] = input }
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
          ref={ input => this.inputs["bookDescription"] = input }
        />
      </View>
    )
  }
}
