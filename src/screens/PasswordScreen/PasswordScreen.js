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
  }

  componentDidMount() {
    this.input.focus();
  }

  componentWillReceiveProps(props) {
    if (props.isPasswordValid) {
      this.props.navigation.navigate(this.props.nextScreen, { profileData: props.navigation.state.params.profileData });
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
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>{this.props.message}</Text>
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
