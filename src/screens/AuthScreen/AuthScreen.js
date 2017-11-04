import React, { Component } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-material-ui";
import { func, shape } from "prop-types";
import { Text, Image, View, AsyncStorage } from "react-native";
import { styles, ICON_SIZE, LOGO_ICON_SIZE } from "./styles";

const {
  screenStyle,
  headerStyle,
  buttonStyle,
  buttonTextStyle,
  facebookButtonStyle,
  googleButtonStyle,
  emailButtonStyle,
  phoneButtonStyle,
  buttonIconStyle,
  slideLogoStyle,
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

  componentDidMount() {
    // temporary line for debugging that removes token each time
    AsyncStorage.removeItem("fb_token");
    AsyncStorage.removeItem("google_token");
    this.onAuthenticated(this.props);
  }

  componentWillReceiveProps(nextProps) {
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
    //this.props.navigation.navigate("schoolSelectionScreen", { profileData: { id: "37", email: "h@foo.com" } } );
  }

  onPhoneButtonPress() {
    this.props.navigation.navigate("phoneScreen");
  }

  renderAuthButtons() {
    return (
      <View>
        <Button
          raised
          primary
          upperCase={false}
          style={{
            container: [buttonStyle, facebookButtonStyle],
            text: buttonTextStyle,
          }}
          icon={<Entypo name="facebook" size={ICON_SIZE} style={buttonIconStyle} />}
          text="Sign in with Facebook"
          onPress={() => this.onFacebookButtonPress()}
        />
        <Button
          raised
          default
          upperCase={false}
          style={{
            container: [buttonStyle, googleButtonStyle],
            text: buttonTextStyle,
          }}
          icon={
            <Image
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
              source={googleImage}
            />}
          text="Sign in with Google"
          onPress={() => this.onGoogleButtonPress()}
        />
        <Button
          raised
          primary
          upperCase={false}
          style={{
            container: [buttonStyle, emailButtonStyle],
            text: buttonTextStyle,
          }}
          icon={<MaterialIcons name="email" size={ICON_SIZE} style={buttonIconStyle} />}
          text="Sign in with Email"
          onPress={() => this.onEmailButtonPress()}
        />
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
      </View>
    );
  }
}
