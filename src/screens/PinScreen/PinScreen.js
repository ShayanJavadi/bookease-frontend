import React, { Component } from "react";
import { Text, View, TextInput, ActivityIndicator, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { bool, func, string, shape, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  invalidInputStyle,
  inputContainerStyle,
  invalidPinTextStyle,
  submitButtonContainerStyle,
  submitButtonDisabledContainerStyle,
  submitButtonTextStyle,
  activitySpinnerStyle,
 } = styles;

 const PIN_LENGTH = 6;


export default class PinScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPinValid: bool.isRequired,
    profileData: object,
    validatePin: func.isRequired,
    nextScreen: string.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  state = {
    pin: "",
    isWaiting: false,
    keyboardVisible: false,
    invalidPinEntered: false,
    submitButtonEnabled: false
  }

  pinBox = [];

  componentDidMount() {
    this.hiddenInput.focus();
  }

  componentWillReceiveProps(props) {
    if (props.isPinValid) {
      this.setState({ invalidPinEntered: false, isWaiting: false });
      this.props.navigation.navigate(this.props.nextScreen, { profileData: props.profileData });
    }
    else {
      this.hiddenInput.setNativeProps({ text: "" });
      this.onChangeText("");
      this.setState({ invalidPinEntered: true, isWaiting: false });
    }
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
    const pin = text.split("");
    const padding = Array(PIN_LENGTH - pin.length).fill("");
    const paddedPin = pin.concat(padding);

    paddedPin.map((character, index) =>
      this.pinBox[index].setNativeProps({ text: character })
    );

    this.setState({
      pin: text,
      submitButtonEnabled: pin.length === PIN_LENGTH,
      invalidPinEntered: false,
    });
  }

  onSubmitButtonPress() {
    this.setState({ isWaiting: true });
    this.props.validatePin({
      pin: this.state.pin,
      identifier: this.props.navigation.state.params.identifier,
      verifier: this.props.mutate,
    });
  }


  render() {
    const isPinInvalid = this.state.invalidPinEntered;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
          <View style={topContainerStyle}>
            <Text style={headerTextStyle}>Enter the PIN you received</Text>
            <Text style={invalidPinTextStyle}>{isPinInvalid ? "Incorrect PIN" : " "}</Text>
            <View style={inputContainerStyle}>
              {Array(PIN_LENGTH).fill().map((n, index) => this.renderPinBox(index, isPinInvalid))}
            </View>
          </View>
          <TextInput
            ref={input => this.hiddenInput = input}
            onChangeText={text => this.onChangeText(text)}
            keyboardType="numeric"
            maxLength={6}
          />
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

  renderPinBox(index, isPinInvalid) {
    const style = isPinInvalid ? invalidInputStyle : inputStyle;

    return (
      <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.hiddenInput.focus()}>
        <TextInput
          style={style}
          editable={false}
          ref={input => this.pinBox[index] = input}
          pointerEvents="none"
        />
      </TouchableOpacity>
    );
  }
}
