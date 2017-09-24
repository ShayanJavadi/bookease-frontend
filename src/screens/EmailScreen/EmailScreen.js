import React, { Component } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";
import { bool, func, shape, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  inputContainerStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
 } = styles;

export default class EmailScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isEmailValid: bool.isRequired,
    validateEmail: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = { email: "", keyboardVisible: false };
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

  onInputChange(value) {
    this.setState({ email: value });
    this.props.validateEmail(value);
  }

  onSubmitButtonPress() {
    this.props.mutate({
      variables: { email: this.state.email }
    });
    this.props.navigation.navigate("emailPinScreen");
  }


  render() {
    return (
      <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter your email</Text>
          <View style={inputContainerStyle}>
            <TextInput
              style={inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => this.onInputChange(value)}
            />
          </View>
        </View>
        {this.props.isEmailValid &&
          (<Button
            raised
            primary
            text="Submit"
            style={{ container: buttonContainerStyle, text: buttonTextStyle }}
            onPress={() => this.onSubmitButtonPress()}
          />)
        }
        {!this.props.isEmailValid &&
          (<Button
            disabled
            raised
            primary
            text="Submit"
            style={{ container: disabledButtonContainerStyle, text: buttonTextStyle }}
          />)
        }
      </View>
    );
  }
}
