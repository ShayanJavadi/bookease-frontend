import React, { Component } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-material-ui";
import { func, shape } from "prop-types";
import { Text, View } from "react-native";
import { styles, ICON_SIZE, LOGO_ICON_SIZE } from "./styles";

const {
  screenStyle,
  headerStyle,
  buttonStyle,
  buttonTextStyle,
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
