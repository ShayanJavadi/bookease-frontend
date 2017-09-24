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
  invalidPinTextStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
 } = styles;

 const PIN_LENGTH = 6;


export default class PinScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isPinValid: bool.isRequired,
    validatePin: func.isRequired,
    nextScreen: string.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
      state: object.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.pinBox = [];
    this.state = {
      pin: "",
      invalidPinEntered: false,
      submitButtonEnabled: false
    };
  }

  componentDidMount() {
    this.hiddenInput.focus();
  }

  componentWillReceiveProps(props) {
    if (props.isPinValid) {
      this.props.navigation.navigate(this.props.nextScreen);
    }
    else {
      this.hiddenInput.setNativeProps({ text: "" });
      this.onChangeText("");
      this.setState({ invalidPinEntered: true });
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
    this.props.validatePin({
      pin: this.state.pin,
      identifier: this.props.navigation.state.params.email,
      verifier: this.props.mutate,
    });
  }


  render() {
    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter the PIN you received</Text>
          {this.state.invalidPinEntered &&
            (<Text style={invalidPinTextStyle}>Incorrect PIN</Text>)
          }
          <View style={inputContainerStyle}>
            {Array(PIN_LENGTH).fill().map((n, index) => this.renderPinBox(index))}
          </View>
          {this.state.submitButtonEnabled &&
            (<Button
              raised
              primary
              text="Submit"
              style={{ container: buttonContainerStyle, text: buttonTextStyle }}
              onPress={() => this.onSubmitButtonPress()}
            />)
          }
          {!this.state.submitButtonEnabled &&
            (<Button
              disabled
              raised
              primary
              text="Submit"
              style={{ container: disabledButtonContainerStyle, text: buttonTextStyle }}
            />)
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
