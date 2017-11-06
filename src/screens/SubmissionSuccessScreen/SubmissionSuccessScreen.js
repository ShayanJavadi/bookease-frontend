import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationActions } from 'react-navigation'
import { Button } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  backButtonIconStyle,
  successIconWrapperStyle,
  successIconStyle,
  successMessageWrapperStyle,
  successMessageHeaderStyle,
  successMessageTextStyle,
  buttonsWrapperStyle,
  primaryButtonContainerStyle,
  primaryButtonTextStyle,
  secondaryButtonContainerStyle,
  secondaryButtonTextStyle,
  closeIconWrapperStyle,
  closeIconStyle
} = styles;

export default class SubmissionSuccessScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    header: null,
    gesturesEnabled: false,
  });

  closeSuccessScreen() {
    const closeSuccessScreenAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'mainScreen'})
      ]
    })
    this.props.navigation.dispatch(closeSuccessScreenAction)
  }

  renderCloseIcon() {
    return (
      <TouchableOpacity style={closeIconWrapperStyle} onPress={() => this.closeSuccessScreen()}>
        <MaterialIcons name="close" size={50} style={closeIconStyle} />
      </TouchableOpacity>
    )
  }

  renderSuccessIcon() {
    return (
      <View style={successIconWrapperStyle}>
        <MaterialIcons name="done" size={50} style={successIconStyle} />
      </View>
    )
  }

  renderSuccessMessage() {
    return (
      <View style={successMessageWrapperStyle}>
        <Text style={successMessageHeaderStyle}>Success!</Text>
        <Text style={successMessageTextStyle}>Your textbook was posted.</Text>
      </View>
    )
  }

  renderButtons() {
    return (
      <View style={buttonsWrapperStyle}>
        <Button
          raised
          primary
          upperCase={false}
          text="Post Another Textbook"
          style={{ container: primaryButtonContainerStyle, text: primaryButtonTextStyle }}
        />
        <Button
          primary
          upperCase={false}
          text="View Your Post"
          style={{ container: secondaryButtonContainerStyle, text: secondaryButtonTextStyle }}
        />
      </View>
    )
  }

  render() {
    const scannedTextbook = this.props.navigation.state.params ?
    this.props.navigation.state.params.scannedTextbook :
    undefined;

    return (
      <View style={screenStyle}>
        {this.renderCloseIcon()}
        {this.renderSuccessIcon()}
        {this.renderSuccessMessage()}
        {this.renderButtons()}
        <StatusBar hidden />
      </View>
    );
  }
}
