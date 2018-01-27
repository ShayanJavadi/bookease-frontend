import React, { Component } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { func, string, shape, object, bool } from "prop-types";
import { styles, palette } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  inputContainerStyle,
  paddingTextStyle,
  submitButtonContainerStyle,
  submitButtonDisabledContainerStyle,
  submitButtonTextStyle,
 } = styles;

 const {
   primaryColor,
 } = palette;

export default class ChangeFullNameScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    nextScreen: string.isRequired,
    submitFullName: func.isRequired,
    mutate: func.isRequired,
    updateUser: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
    }).isRequired
  }

  state = {
    fullName: "",
    isNameValid: false,
    keyboardVisible: false,
    isWaiting: false,
  }

  componentDidMount() {
    this.input.focus();
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardWillShow", this.keyboardWillShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener("keyboardWillHide", this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow() {
    this.setState({ keyboardVisible: true });
  }

  keyboardWillHide() {
    this.setState({ keyboardVisible: false });
  }

  onChangeText(text) {
    this.setState({ fullName: text });
    this.validateFullName(text);
  }

  onSubmitButtonPress() {
    const fullName = this.state.fullName;
    const oldProfileData = this.props.currentUser;

    let newProfileData = Object.assign({}, oldProfileData);
    newProfileData.fullName = fullName;

    this.props.submitFullName({
      fullName,
      profileData: newProfileData,
      submitter: this.props.mutate,
    });
    this.props.updateUser(newProfileData);
    this.props.navigation.navigate(this.props.nextScreen);
  }

  validateFullName(fullName) {
    const validationRegExp = /\S+\s+\S+/;
    const isNameValid = validationRegExp.test(fullName);

    this.setState({
      updateCounter: this.state.updateCounter + 1,
      isNameValid: isNameValid,
    });
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
          <View style={topContainerStyle}>
            <Text style={headerTextStyle}>Enter your full name</Text>
            <Text style={paddingTextStyle}>{" "}</Text>
            <View style={inputContainerStyle}>
              <TextField
                label="Full name"
                autoCorrect={false}
                autoCapitalize="words"
                fontSize={20}
                tintColor={primaryColor}
                containerStyle={inputStyle}
                onChangeText={value => this.onChangeText(value)}
                ref={input => this.input = input}
              />
            </View>
          </View>
          {this.state.isNameValid &&
            (<Button
              raised
              primary
              text="Submit"
              style={{ container: submitButtonContainerStyle, text: submitButtonTextStyle }}
              onPress={() => this.onSubmitButtonPress()}
            />)
          }
          {!this.state.isNameValid &&
            (<Button
              disabled
              raised
              primary
              text="Submit"
              style={{ container: submitButtonDisabledContainerStyle, text: submitButtonTextStyle }}
            />)
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
