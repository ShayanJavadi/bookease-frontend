import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { func, string, shape, object, bool } from "prop-types";
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

export default class ChangeFullNameScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    nextScreen: string.isRequired,
    validateFullName: func.isRequired,
    submitFullName: func.isRequired,
    mutate: func.isRequired,
    isFullNameValid: bool.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  state = {
    fullName: "",
    submitButtonEnabled: false,
  }

  componentWillReceiveProps(props) {
    this.setState({
      submitButtonEnabled: props.isFullNameValid,
    });
  }

  componentDidMount() {
    this.input.focus();
  }

  onChangeText(text) {
    this.setState({ fullName: text });
    this.props.validateFullName({ fullName: text });
  }

  onSubmitButtonPress() {
    this.props.submitFullName({
      password: this.state.password,
      profileData: this.props.navigation.state.params.profileData,
      submitter: this.props.mutate,
    });
    this.props.navigation.navigate(this.props.nextScreen, { profileData: this.props.navigation.state.params.profileData });
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
