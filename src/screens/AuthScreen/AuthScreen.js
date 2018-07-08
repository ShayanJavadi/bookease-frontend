import React, { Component } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-material-ui";
import { NavigationActions, StackActions } from "react-navigation";
import { func, shape } from "prop-types";
import { Text, View, AsyncStorage, TouchableOpacity } from "react-native";
import { styles, ICON_SIZE, LOGO_ICON_SIZE } from "./styles";

const {
  screenStyle,
  headerStyle,
  buttonStyle,
  buttonTextStyle,
  phoneButtonStyle,
  buttonIconStyle,
  slideLogoStyle,
  closeIconWrapperStyle,
  closeIconStyle,
} = styles;

const googleImage = require("./assets/images/google-g.png"); // eslint-disable-line

export default class AuthScreen extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    googleLogin: func.isRequired,
    facebookLogin: func.isRequired
  };

  static navigationOptions = () => ({
    gesturesEnabled: false,
  })

  componentDidMount() {
    // temporary line for debugging that removes token each time
    AsyncStorage.removeItem("fb_token");
    AsyncStorage.removeItem("google_token");
    this.onAuthenticated(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onAuthenticated(nextProps);
  }

  onAuthenticated(props) {
    if (props.facebookAuthToken || props.googleAuthToken) {
      this.props.navigation.navigate("schoolSelectionScreen");
    }
  }

  onFacebookButtonPress() {
    this.props.facebookLogin();
  }

  onGoogleButtonPress() {
    this.props.googleLogin();
  }

  onEmailButtonPress() {
    this.props.navigation.navigate("emailScreen");
  }

  onPhoneButtonPress() {
    this.props.navigation.navigate("phoneScreen");
  }

  closeAuthScreen() {
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

  renderCloseIcon() {
    return (
      <TouchableOpacity style={closeIconWrapperStyle} onPress={() => this.closeAuthScreen()}>
        <MaterialIcons name="close" size={50} style={closeIconStyle} />
      </TouchableOpacity>
    )
  }

  renderAuthButtons() {
    return (
      <View>
        <Button
          raised
          primary
          upperCase={false}
          style={{
            container: [buttonStyle, phoneButtonStyle],
            text: buttonTextStyle,
          }}
          icon={<MaterialIcons name="phone" size={ICON_SIZE} style={buttonIconStyle} />}
          text="Sign in with Phone"
          onPress={() => this.onPhoneButtonPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={screenStyle}>
        <View>
          <Entypo name="book" size={LOGO_ICON_SIZE} style={slideLogoStyle} />
        </View>
        <View>
          <Text style={headerStyle}>Sign In</Text>
        </View>
        {this.renderAuthButtons()}
        {this.renderCloseIcon()}
      </View>
    );
  }
}
