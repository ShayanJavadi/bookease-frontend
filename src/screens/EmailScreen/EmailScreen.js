import React, { Component } from "react";
import { Text, View, TextInput, ActivityIndicator, Keyboard } from "react-native";
import { bool, func, shape } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  invalidEmailTextStyle,
  inputStyle,
  invalidInputStyle,
  inputContainerStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
  activitySpinnerStyle,
 } = styles;

export default class EmailScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    isEmailValid: bool.isRequired,
    validateEmail: func.isRequired,
    mutate: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  state = {
    email: "",
    emailInUse: false,
    keyboardVisible: false
   }

  componentDidMount() {
    this.input.focus();
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
    this.setState({
      email: value,
      emailInUse: false,
     });
    this.props.validateEmail(value);
  }

  onSubmitButtonPress() {
    this.setState({ isWaiting: true });
    this.props.mutate({
      variables: { email: this.state.email }
    })
    .then(() => {
        this.setState({ isWaiting: false });
        this.props.navigation.navigate("emailPinScreen", {
          identifier: this.state.email,
         });
      }
    )
    .catch(() => {
        this.setState({ isWaiting: false  });
        this.props.navigation.navigate("emailPasswordScreen", {
          profileData: { email: this.state.email }
        });
      }
    );
  }


  render() {
    return (
      <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Enter your email</Text>
          <Text style={invalidEmailTextStyle}>{this.state.emailInUse? "Email already in use" : " "}</Text>
          <View style={inputContainerStyle}>
            <TextInput
              style={this.state.emailInUse ? invalidInputStyle : inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={value => this.onInputChange(value)}
              ref={input => this.input = input}
            />
          </View>
        </View>
        {!this.state.isWaiting && this.props.isEmailValid &&
          (<Button
            raised
            primary
            text="Submit"
            style={{ container: buttonContainerStyle, text: buttonTextStyle }}
            onPress={() => this.onSubmitButtonPress()}
          />)
        }
        {!this.state.isWaiting && !this.props.isEmailValid &&
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
