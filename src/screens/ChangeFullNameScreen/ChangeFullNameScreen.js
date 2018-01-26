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
    validateFullName: func.isRequired,
    submitFullName: func.isRequired,
    mutate: func.isRequired,
    updateUser: func.isRequired,
    isFullNameValid: bool.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  state = {
    fullName: "",
    keyboardVisible: false,
    submitButtonEnabled: false,
    isWaiting: false,
  }

  componentWillReceiveProps(props) {
    this.setState({
      submitButtonEnabled: props.isFullNameValid,
    });
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
    this.props.validateFullName({ fullName: text });
  }

  onSubmitButtonPress() {
    const profileData = this.props.navigation.state.params.profileData;

    this.props.submitFullName({
      fullName: this.state.fullName,
      profileData: profileData,
      submitter: this.props.mutate,
    });
    this.props.updateUser(profileData);
    this.props.navigation.navigate(this.props.nextScreen, { profileData: profileData });
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
          {this.state.submitButtonEnabled &&
            (<Button
              raised
              primary
              text="Submit"
              style={{ container: submitButtonContainerStyle, text: submitButtonTextStyle }}
              onPress={() => this.onSubmitButtonPress()}
            />)
          }
          {!this.state.submitButtonEnabled &&
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
