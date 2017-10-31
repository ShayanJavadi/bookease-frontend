import React, { Component } from "react";
import { Text, View, TextInput, ActivityIndicator } from "react-native";
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
  invalidPinTextStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
  activitySpinnerStyle,
 } = styles;

 const PIN_LENGTH = 6;


export default class PinScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPinValid: bool.isRequired,
    profileData: object.isRequired,
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
    invalidPinEntered: false,
    submitButtonEnabled: false
  }

  pinBox = [];

  componentDidMount() {
    this.hiddenInput.focus();
  }

  componentWillReceiveProps(props) {
    if (props.isPinValid) {
      this.setState({ isWaiting: false });
      this.props.navigation.navigate(this.props.nextScreen, { profileData: props.profileData });
    }
    else {
      this.hiddenInput.setNativeProps({ text: "" });
      this.onChangeText("");
      this.setState({ invalidPinEntered: true, isWaiting: false });
    }
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
    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter the PIN you received</Text>
          <Text style={invalidPinTextStyle}>{this.state.invalidPinEntered? "Incorrect PIN" : " "}</Text>
          <View style={inputContainerStyle}>
            {Array(PIN_LENGTH).fill().map((n, index) => this.renderPinBox(index))}
          </View>
          {!this.state.isWaiting && this.state.submitButtonEnabled &&
            (<Button
              raised
              primary
              text="Submit"
              style={{ container: buttonContainerStyle, text: buttonTextStyle }}
              onPress={() => this.onSubmitButtonPress()}
            />)
          }
          {!this.state.isWaiting && !this.state.submitButtonEnabled &&
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
        <TextInput
          ref={input => this.hiddenInput = input}
          onChangeText={text => this.onChangeText(text)}
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
    );
  }

  renderPinBox(index) {
    const style = this.state.invalidPinEntered ? invalidInputStyle : inputStyle;
    return (<TextInput
        style={style}
        key={index}
        editable={false}
        ref={input => this.pinBox[index] = input}
    />);
  }
}
