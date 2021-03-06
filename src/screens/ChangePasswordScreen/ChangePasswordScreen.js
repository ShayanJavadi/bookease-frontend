import React, { Component } from "react";
import { Text, View, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { bool, func, shape, object } from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  showHideIconStyle,
  activitySpinnerStyle,
 } = styles;

const {
   primaryColor,
 } = palette;

const MINIMUM_PASSWORD_LENGTH = 6;


export default class PasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPasswordValid: bool.isRequired,
    submitPassword: func.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired,
    getSessionQuery: shape({
      refetch: func.isRequired
    }),
    getSchoolNameQuery: shape({
      refetch: func.isRequired
    }),
  }

  state = {
    password: "",
    passwordVisible: false,
    invalidPasswordEntered: false,
    submitButtonEnabled: false,
    isWaiting: false,
  }

  isProfileUpdateInProgress = false;

  componentDidMount() {
    this.input.focus();
  }

  UNSAFE_componentWillMount() {
    this.isProfileUpdateInProgress = false;
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

  async UNSAFE_componentWillReceiveProps(props) {
    if (this.isProfileUpdateInProgress) return;

    const isPasswordEmpty = (this.state.password === "");
    const isPasswordInvalid = !isPasswordEmpty && !props.isPasswordValid;

    if (isPasswordInvalid) {
      this.input.clear();
      this.onChangeText("");
      this.setState({ isWaiting: false, invalidPasswordEntered: true });
    }

    if (isPasswordInvalid || isPasswordEmpty) return;

    this.isProfileUpdateInProgress = true;

    const profileData = props.navigation.state.params.profileData;

    this.setState({
      isWaiting: false,
      invalidPasswordEntered: false,
      password: "",
    });

    const nextScreenSequence = this.props.navigation.state.params.nextScreenSequence;
    const newNextScreenSequence = nextScreenSequence.slice(1);
    const nextScreen = nextScreenSequence[0];

    this.props.navigation.navigate(nextScreen, {
      nextScreenSequence: newNextScreenSequence,
      profileData,
    });
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
            <Text style={headerTextStyle}>Choose a password</Text>
            <Text style={invalidPasswordTextStyle}>{this.state.invalidPasswordEntered ? "Incorrect password" : " "}</Text>
            <View style={inputContainerStyle}>
              <TextField
                label="Password"
                title="At least 6 characters"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={!this.state.passwordVisible}
                fontSize={20}
                tintColor={primaryColor}
                containerStyle={inputStyle}
                onChangeText={value => this.onChangeText(value)}
                ref={input => this.input = input}
              />
              <MaterialCommunityIcons
                name={this.state.passwordVisible ? "eye" : "eye-off"}
                size={32}
                style={showHideIconStyle}
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
