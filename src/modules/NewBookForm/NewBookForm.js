import React  from "react";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";
import { Button } from "react-native-material-ui";
import PictureInput from "src/modules/PictureInput";
import { func } from "prop-types";
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

const NewBookForm = props => (
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
        onPress={() => props.handleSubmit()}
      />
    </View>
  </View>
  );

NewBookForm.propTypes = {
  handleSubmit: func.isRequired
};

export default reduxForm({
  form: "newBook",
})(NewBookForm);
