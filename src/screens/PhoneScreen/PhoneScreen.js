import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, ActivityIndicator, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { NavigationActions } from "react-navigation";
import { bool, func, string, shape } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles, ICON_SIZE } from "./styles";

const {
  screenStyleWithKeyboard,
  screenStyleWithoutKeyboard,
  topContainerStyle,
  headerTextStyle,
  privacyNoticeTextStyle,
  inputStyle,
  inputContainerStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  buttonTextStyle,
  activitySpinnerStyle,
  closeIconWrapperStyle,
  closeIconStyle,
  lockIconStyle,
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

  close() {
    Keyboard.dismiss();

    if (this.props.navigation.state.params.resetToHomeOnClose) {
      const closeSuccessScreenAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "mainScreen" })
        ]
      })
      return this.props.navigation.dispatch(closeSuccessScreenAction);
    }

    this.props.navigation.goBack(null);
    this.props.navigation.goBack(null);
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


  renderInput() {
    return (
      <View style={topContainerStyle}>
        <Text style={headerTextStyle}>Sign in with your phone number</Text>
        <Text style={privacyNoticeTextStyle}>
          <MaterialIcons name="lock-outline" size={16} style={lockIconStyle}  /> We will never share this information with anyone unless you ask us to
        </Text>

        <View style={inputContainerStyle}>
          <TextInputMask
            style={inputStyle}
            placeholder="(555)  555 - 5555"
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
    );
  }

  renderSubmitButton() {
    return (!this.state.isWaiting &&
      (this.props.isPhoneValid ?
        (<Button
          raised
          primary
          text="Submit"
          style={{ container: buttonContainerStyle, text: buttonTextStyle }}
          onPress={() => this.onSubmitButtonPress()}
        />) :
        (<Button
          disabled
          raised
          primary
          text="Submit"
          style={{ container: disabledButtonContainerStyle, text: buttonTextStyle }}
          />)
       )
     );
  }

  renderActivitySpinner() {
    return (
      this.state.isWaiting &&
      <ActivityIndicator
         animating={this.state.animating}
         style={[styles.centering, activitySpinnerStyle]}
         size="large"
       />
    );
  }

  renderCloseIcon() {
    return (
      <TouchableOpacity style={closeIconWrapperStyle} onPress={() => this.close()}>
        <MaterialIcons name="close" size={ICON_SIZE} style={closeIconStyle} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={this.state.keyboardVisible ? screenStyleWithKeyboard : screenStyleWithoutKeyboard}>
          {this.renderInput()}
          {this.renderSubmitButton()}
          {this.renderActivitySpinner()}
          {this.renderCloseIcon()}

        </View>
      </TouchableWithoutFeedback>
    );
  }
}
