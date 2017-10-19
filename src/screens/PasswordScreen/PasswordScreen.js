import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { bool, func, string, shape, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyle,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  invalidInputStyle,
  inputContainerStyle,
  invalidPasswordTextStyle,
  submitButtonContainerStyle,
  submitButtonDisabledContainerStyle,
  submitButtonTextStyle,
  showHideButtonContainerStyle,
  showHideButtonTextStyle,
 } = styles;

 const MINIMUM_PASSWORD_LENGTH = 1;


export default class PasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPasswordValid: bool.isRequired,
    validatePassword: func.isRequired,
    nextScreen: string.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  state = {
    password: "",
    passwordVisible: false,
    invalidPasswordEntered: false,
    submitButtonEnabled: false,
  }

  componentWillReceiveProps(props) {
    if (props.isPasswordValid) {
      this.props.navigation.navigate(this.props.nextScreen);
    }
    else {
      this.input.setNativeProps({ text: "" });
      this.onChangeText("");
      this.setState({ invalidPasswordEntered: true });
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
    this.props.validatePassword({
      password: this.state.password,
      identifier: this.props.navigation.state.params.identifier,
      verifier: this.props.mutate,
    });
  }

  onShowHideButtonPress() {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  }


  render() {
    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter your password</Text>
          <Text style={invalidPasswordTextStyle}>{this.state.invalidPasswordEntered ? "Incorrect password" : " "}</Text>
          <View style={inputContainerStyle}>
            <TextInput
              style={this.state.invalidPasswordEntered ? invalidInputStyle : inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={!this.state.passwordVisible}
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
      </View>
    );
  }
}
