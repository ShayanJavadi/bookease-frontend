import React, { Component } from "react";
import { Text, View, ActivityIndicator, Keyboard } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { bool, func, string, shape } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  invalidPhoneTextStyle,
  inputStyle,
  invalidInputStyle,
  inputContainerStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
  activitySpinnerStyle,
 } = styles;

export default class PhoneScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPhoneValid: bool.isRequired,
    phoneNumber: string.isRequired,
    validatePhone: func.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  state = {
    phone: "",
    phoneInUse: false,
    isWaiting: false,
    keyboardVisible: false,
    maskedValue: "",
   }

  componentDidMount() {
    this.input.getElement().focus();
    this.onInputChange("");
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
    this.props.validatePhone(value);

    this.setState({
      phoneInUse: false,
      maskedValue: value,
    });
  }

  onSubmitButtonPress() {
    this.setState({ isWaiting: true });
    this.props.mutate({
      variables: { phoneNumber: this.props.phoneNumber }
    })
    .then(() => {
        this.setState({ isWaiting: false });
        this.props.navigation.navigate("phonePinScreen", { identifier: this.props.phoneNumber });
      }
    )
    .catch(() => {
        this.setState({ isWaiting: false });
        this.props.navigation.navigate("phonePasswordScreen", { profileData: { phoneNumber: this.props.phoneNumber } });
      }
    );
  }


  render() {
    return (
      <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter your phone number</Text>
          <Text style={invalidPhoneTextStyle}>{this.state.phoneInUse? "Phone number already in use" : " "}</Text>
          <View style={inputContainerStyle}>
            <TextInputMask
              style={this.state.phoneInUse ? invalidInputStyle : inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              textAlign="center"
              keyboardType="phone-pad"
              value={this.state.maskedValue}
              ref={input => this.input = input}
              onChangeText={text => this.onInputChange(text)}
              type="custom"
              options={ { mask: "(999) 999 - 9999" } }
            />
          </View>
        </View>
        {!this.state.isWaiting && this.props.isPhoneValid &&
          (<Button
            raised
            primary
            text="Submit"
            style={{ container: buttonContainerStyle, text: buttonTextStyle }}
            onPress={() => this.onSubmitButtonPress()}
          />)
        }
        {!this.state.isWaiting && !this.props.isPhoneValid &&
          (<Button
            disabled
            raised
            primary
            text="Submit"
            style={{ container: disabledButtonContainerStyle, text: buttonTextStyle }}
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
    );
  }
}
