import React, { Component } from "react";
import { Text, View, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { bool, func, string, shape, object } from "prop-types";
import { styles, palette } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  inputContainerStyle,
  invalidPasswordTextStyle,
  submitButtonContainerStyle,
  submitButtonDisabledContainerStyle,
  submitButtonTextStyle,
  showHideButtonContainerStyle,
  showHideButtonTextStyle,
  activitySpinnerStyle,
 } = styles;

const {
   primaryColor,
 } = palette;

const MINIMUM_PASSWORD_LENGTH = 1;


export default class PasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    message: string.isRequired,
    isPasswordValid: bool.isRequired,
    submitPassword: func.isRequired,
    nextScreen: string.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired,
  }

  static defaultProps = {
    message: "Enter your password",
  }

  state = {
    password: "",
    passwordVisible: false,
    invalidPasswordEntered: false,
    submitButtonEnabled: false,
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

  componentWillReceiveProps(props) {
    if (props.isPasswordValid) {
      this.setState({ isWaiting: false });
      this.props.navigation.navigate(this.props.nextScreen, { profileData: props.navigation.state.params.profileData });
    }
    else {
      this.input.clear();
      this.onChangeText("");
      this.setState({ isWaiting: false, invalidPasswordEntered: true });
    }
  }

  onChangeText(text) {
    this.setState({
      password: text,
      submitButtonEnabled: text.length >= MINIMUM_PASSWORD_LENGTH,
      invalidPasswordEntered: false,
    });
  }

  onSubmitButtonPress() {
    this.setState({ isWaiting: true });
    this.props.submitPassword({
      password: this.state.password,
      profileData: this.props.navigation.state.params.profileData,
      submitter: this.props.mutate,
    });
  }

  onShowHideButtonPress() {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
          <View style={topContainerStyle}>
            <Text style={headerTextStyle}>{this.props.message}</Text>
            <Text style={invalidPasswordTextStyle}>{this.state.invalidPasswordEntered ? "Incorrect password" : " "}</Text>
            <View style={inputContainerStyle}>
              <TextField
                label="Password"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={!this.state.passwordVisible}
                fontSize={20}
                tintColor={primaryColor}
                containerStyle={inputStyle}
                onChangeText={value => this.onChangeText(value)}
                ref={input => this.input = input}
              />
              <Button
                  raised
                  primary
                  text={this.state.passwordVisible ? "Hide" : "Show"}
                  style={{ container: showHideButtonContainerStyle, text: showHideButtonTextStyle }}
                  onPress={() => this.onShowHideButtonPress()}
                />
            </View>
          </View>
          {!this.state.isWaiting && this.state.submitButtonEnabled &&
            (<Button
              raised
              primary
              text="Submit"
              style={{ container: submitButtonContainerStyle, text: submitButtonTextStyle }}
              onPress={() => this.onSubmitButtonPress()}
            />)
          }
          {!this.state.isWaiting && !this.state.submitButtonEnabled &&
            (<Button
              disabled
              raised
              primary
              text="Submit"
              style={{ container: submitButtonDisabledContainerStyle, text: submitButtonTextStyle }}
            />)
          }
          {this.state.isWaiting &&
            <ActivityIndicator
               animating={this.state.animating}
               style={[styles.centering, activitySpinnerStyle]}
               size="large"
             />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
