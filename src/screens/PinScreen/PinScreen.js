import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyle,
  headerTextStyle,
  inputStyle,
  invalidInputStyle,
  inputContainerStyle,
  buttonContainerStyle,
  buttonTextStyle,
 } = styles;

 const PIN_LENGTH = 6;


export default class PinScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.pinInput = [];
    this.pinValues = [];
    this.state = {
      invalidPinEntered: false,
      submitButtonEnabled: false
    };
  }

  componentDidMount() {
    this.pinInput[0].focus();
  }

  onComplete() {
    this.props.navigation.navigate("home");
  }


  onPinChangeText(index, text) {
    const wasBackspace = text.length === 0;

    if(!wasBackspace && index < PIN_LENGTH - 1) {
      this.pinInput[index + 1].focus();
    }

    this.pinValues[index] = text;

    this.setButtonEnabledStatus();
    this.setState({ invalidPinEntered: false });
  }

  onPinKeyPress(index, key) {
    const wasBackspace = key === "Backspace";
    const wasEnter = key === "Enter";

    if(wasBackspace && !this.pinValues[index] && index > 0) {
      this.pinInput[index - 1].focus();
    }
    else if(!wasBackspace && !wasEnter && this.pinValues[index] && index < PIN_LENGTH - 1) {
      this.pinInput[index + 1].focus();
      this.pinInput[index + 1].setNativeProps({ text: key });
      this.pinValues[index + 1] = key;
    }
  }

  onSubmitButtonPress() {
    const pin = this.pinValues.join("");
    const isPinValid = pin === "123456";

    if(isPinValid) {
      this.setState({ invalidPinEntered: false });
    }
    else {
      this.pinInput.forEach(input => input.setNativeProps({ text: "" }));
      this.pinValues = this.pinValues.map(value => "");
      this.pinInput[0].focus();
      this.setState({ invalidPinEntered: true });
    }
  }


  setButtonEnabledStatus() {
    const pin = this.pinValues.join("");
    const hasAllDigits = pin.length === PIN_LENGTH;

    this.setState({ submitButtonEnabled: hasAllDigits });
  }


  render() {
    return (
      <View style={screenStyle}>
        <Text style={headerTextStyle}>Enter the PIN you received</Text>
        <View style={inputContainerStyle}>
          {Array(PIN_LENGTH).fill().map((n, index) => this.renderPinInput(index))}
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
            style={{ container: buttonContainerStyle, text: buttonTextStyle }}
          />)
        }
      </View>
    );
  }

  renderPinInput(index) {
    const style = this.state.invalidPinEntered ? invalidInputStyle : inputStyle;
    return (<TextInput
        style={style}
        onChangeText={text => this.onPinChangeText(index, text)}
        onKeyPress={event => this.onPinKeyPress(index, event.nativeEvent.key)}
        ref={input => this.pinInput[index] = input}
        keyboardType="numeric"
        maxLength={1}
    />);
  }
}
