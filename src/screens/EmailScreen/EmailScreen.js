import React, { Component } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";
import { func, shape,} from "prop-types";
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
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
 } = styles;

 const PIN_LENGTH = 6;


export default class EmailScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    validateEmail: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = { keyboardVisible: false };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
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


  onComplete() {
    this.props.navigation.navigate("home");
  }

  onInputChange(value) {
    this.props.validateEmail(value);
  }

  onSubmitButtonPress() {

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
