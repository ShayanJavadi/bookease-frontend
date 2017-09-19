import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-material-ui";
import PictureInput from "src/modules/PictureInput";
import FormTextInput from "src/modules/FormTextInput";
import { styles } from "./styles";

const {
  textInputWrapperStyle,
  formWrapperStyle,
  inputWrapperStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
} = styles;

class NewBookForm extends Component {
  componentDidMount() {
    const { scannedBook, dispatch } = this.props;
    if (scannedBook) {
      const { title } = scannedBook;
      dispatch(change("newBook", "bookTitle", title));
    }
  }

  render() {
    return (
      <View style={formWrapperStyle}>
        <PictureInput />
        <View style={textInputWrapperStyle}>
          <View style={[inputWrapperStyle]}>
            <Field
              name={"bookTitle"}
              component={FormTextInput}
              placeholder={"Book Title"}
            />
          </View>
          <View style={[inputWrapperStyle]}>
            <Field
              name={"isbn"}
              component={FormTextInput}
              placeholder={"Isbn"}
            />
          </View>
          <View style={[inputWrapperStyle]}>
            <Field
              name={"edition"}
              component={FormTextInput}
              placeholder={"Edition"}
            />
            <Field
              name={"author"}
              component={FormTextInput}
              placeholder={"Author"}
            />
          </View>
          <View style={[inputWrapperStyle]}>
            <Field
              name={"condition"}
              component={FormTextInput}
              placeholder={"Condition"}
            />
            <Field
              name={"price"}
              component={FormTextInput}
              placeholder={"Price"}
            />
          </View>
        </View>
        <View style={buttonWrapperStyle}>
          <Button
            text="Confirm"
            raised
            style={{ text: buttonTextStyle, container: buttonContainerStyle }}
            onPress={() => this.props.handleSubmit()}
          />
        </View>
      </View>
    );
  }
};

export default reduxForm({
  form: "newBook",
})(NewBookForm);
