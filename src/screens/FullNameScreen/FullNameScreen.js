import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { func, string, shape, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyle,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  inputContainerStyle,
  submitButtonContainerStyle,
  submitButtonDisabledContainerStyle,
  submitButtonTextStyle,
 } = styles;

export default class FullNameScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    nextScreen: string.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  state = {
    fullName: "",
    submitButtonEnabled: false,
  }

  componentDidMount() {
    this.input.focus();
  }

  validateName(name) {
    const validationRegExp = /\S+\s+\S+/;
    return validationRegExp.test(name);
  }

  onChangeText(text) {
    this.setState({
      fullName: text,
      submitButtonEnabled: this.validateName(text),
    });
  }

  onSubmitButtonPress() {
    this.props.navigation.navigate(this.props.nextScreen);
  }


  render() {
    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter your full name</Text>
          <View style={inputContainerStyle}>
            <TextInput
              style={inputStyle}
              autoCorrect={false}
              autoCapitalize="words"
              onChangeText={value => this.onChangeText(value)}
              ref={input => this.input = input}
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
