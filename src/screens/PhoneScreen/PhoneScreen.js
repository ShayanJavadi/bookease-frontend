import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, ActivityIndicator, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { TextField } from "react-native-material-textfield";
import { TextInputMask } from "react-native-masked-text";
import { NavigationActions, StackActions } from "react-navigation";
import { func, string, shape } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles, palette, ICON_SIZE } from "./styles";

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

 const {
    primaryColor,
  } = palette;

export default class PhoneScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    phoneNumber: string,
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
      const closeSuccessScreenAction = StackActions.reset({
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
    const cleanPhoneNumber = this.validateAndCleanPhone(value);

    this.setState({
      phoneInUse: false,
      phoneNumber: cleanPhoneNumber,
      maskedValue: value,
    });
  }

  validateAndCleanPhone(value) {
    const validationRegExp = /-|\s|\(|\)/;
    const cleanPhoneNumber = value.split(validationRegExp).join("");
    const isPhoneValid = cleanPhoneNumber.length === 10;

    this.setState({
      isPhoneValid,
    });

    return cleanPhoneNumber;
  }

  onSubmitButtonPress() {
    this.setState({ isWaiting: true });

    const phoneNumber = this.state.phoneNumber;

    this.props.mutate({
      variables: { phoneNumber }
    })
    .then(() => {
        this.setState({ isWaiting: false });

        this.props.navigation.navigate("phonePinScreen", {
          identifier: phoneNumber,
          nextScreenSequence: ["changePasswordScreen", "changeFullNameScreen", "schoolSelectionScreen", "homeScreen"],
        });
      }
    )
    .catch(() => {
        this.setState({ isWaiting: false });

        const isAuthenticationPopup = this.props.navigation.state.params.isAuthenticationPopup

        this.props.navigation.navigate("phonePasswordScreen", {
          profileData: { phoneNumber },
          isAuthenticationPopup,
          nextScreenSequence: isAuthenticationPopup ? [] : ["homeScreen"],
        });
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
            customTextInput={TextField}
            customTextInputProps={{
              label: "Phone Number",
              fontSize: 20,
              tintColor: primaryColor,
              containerStyle: inputStyle,
            }}
          />
        </View>
      </View>
    );
  }

  renderSubmitButton() {
    return (!this.state.isWaiting &&
      (this.state.isPhoneValid ?
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
