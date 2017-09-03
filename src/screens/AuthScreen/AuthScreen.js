import React, {Component} from "react";
import {Entypo, EvilIcons} from "@expo/vector-icons";
import {Button} from "react-native-material-ui";
import {Text, View, AsyncStorage} from "react-native";
import {styles, ICON_SIZE, LOGO_ICON_SIZE} from "./styles";

const {
  screenStyle,
  headerStyle,
  buttonStyle,
  buttonTextStyle,
  facebookButtonStyle,
  googleButtonStyle,
  twitterButtonStyle,
  buttonIconStyle,
  slideLogoStyle,
} = styles;

export default class AuthScreen extends Component {
  componentDidMount() {
    // temporary line for debugging that removes token each time
    AsyncStorage.removeItem("fb_token");
    this.onAuthenticated(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthenticated(nextProps);
  }

  onAuthenticated(props) {
    if (props.facebookAuthToken) {
      this.props.navigation.navigate("schoolSelectionScreen");
    }
  }

  onFacebookButtonPress() {
    this.props.facebookLogin();
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
          text="Sign In with Facebook"
          onPress={() => this.onFacebookButtonPress()}
        />
        <Button
          raised
          primary
          upperCase={false}
          style={{
            container: [buttonStyle, googleButtonStyle],
            text: buttonTextStyle,
          }}
          icon={<Entypo name="google-" size={ICON_SIZE} style={buttonIconStyle} />}
          text="Sign In with Google"
          onPress={() => this.onComplete}
        />
        <Button
          raised
          primary
          upperCase={false}
          style={{
            container: [buttonStyle, twitterButtonStyle],
            text: buttonTextStyle,
          }}
          icon={<Entypo name="twitter" size={ICON_SIZE} style={buttonIconStyle} />}
          text="Sign In with Twitter"
          onPress={() => this.onComplete}
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
