import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shape, func } from "prop-types";
import { NavigationActions } from "react-navigation"
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyle,
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
  static navigationOptions = () => ({
    tabBarVisible: false,
    header: null,
    gesturesEnabled: false,
  });

  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  }

  state = {
    submittedTextbook: this.props.navigation.state.params ?
    this.props.navigation.state.params.submittedBook :
    undefined,
    submittedBuyRequest: this.props.navigation.state.params ?
    this.props.navigation.state.params.submittedBuyRequest :
    undefined
  }


  closeSuccessScreen() {
    const closeSuccessScreenAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "mainScreen" })
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
    const { submittedTextbook, submittedBuyRequest } = this.state;

    if (submittedTextbook) {
      return (
        <View style={successMessageWrapperStyle}>
          <Text style={successMessageHeaderStyle}>Success!</Text>
          <Text style={successMessageTextStyle}>Your textbook was posted.</Text>
        </View>
      )
    }

    if (submittedBuyRequest) {
      return (
        <View style={successMessageWrapperStyle}>
          <Text style={successMessageHeaderStyle}>Success!</Text>
          <Text style={successMessageTextStyle}>Your request was submitted.</Text>
        </View>
      )
    }
  }

  renderSubmittedBuyRequestButtons() {
    return (
      <View>
        <Button
          primary
          raised
          upperCase={false}
          text="View Your Request"
          onPress={() => alert("coming soon")}
          style={{ container: secondaryButtonContainerStyle, text: secondaryButtonTextStyle }}
        />
        <Button
          primary
          upperCase={false}
          text="Browse Textbooks"
          onPress={() => this.closeSuccessScreen()}
          style={{ container: secondaryButtonContainerStyle, text: secondaryButtonTextStyle }}
        />
      </View>
    )
  }

  renderSubmittedTextbookButtons() {
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
          onPress={() => this.props.navigation.navigate("singleBook", { textbookId: this.state.submittedTextbook.id })}
          style={{ container: secondaryButtonContainerStyle, text: secondaryButtonTextStyle }}
        />
      </View>
    )
  }

  renderButtons() {
    const { submittedTextbook, submittedBuyRequest } = this.state;

    if (submittedTextbook) {
      return this.renderSubmittedTextbookButtons()
    }

    if (submittedBuyRequest) {
      return this.renderSubmittedBuyRequestButtons()
    }
  }

  render() {
    // TODO: add indicator to help user understand they are sending a message to the seller
    // IDEA: (user account avatar) => (recipient account avater)
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
