import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shape, func } from "prop-types";
import { NavigationActions } from "react-navigation"
import { Button } from "react-native-material-ui";
import { styles } from "./styles";
import PhoneNumberContainer from "src/modules/PhoneNumberContainer";
import openSms from "src/common/lib/openSms";

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
    undefined,
    acceptedBuyRequest: this.props.navigation.state.params ?
    this.props.navigation.state.params.acceptedBuyRequest :
    undefined,
  }

  navigateToMyBooks() {
    const closeSuccessScreenAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: "mainScreen",
          action: NavigationActions.navigate({ routeName: "myBooks" })
        }),
      ]
    });

    this.props.navigation.dispatch(closeSuccessScreenAction);
  }

  navigateToSingleBuyRequestScreen(notificationId) {
    const closeSuccessScreenAction = NavigationActions.reset({
      index: 1,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: "mainScreen",
          action: NavigationActions.navigate({ routeName: "notifications" })
        }),
        NavigationActions.navigate({
          routeName: "singleNotificationScreen",
          params: { notificationType: "BUY_REQUEST", notificationId: notificationId }
        })
      ]
    });

    this.props.navigation.dispatch(closeSuccessScreenAction);
  }

  closeSuccessScreen() {
    const { submittedTextbook, submittedBuyRequest, acceptedBuyRequest } = this.state;

    if (submittedTextbook) {
      return this.navigateToMyBooks();
    }

    if (submittedBuyRequest) {
      return this.navigateToSingleBuyRequestScreen(submittedBuyRequest.data && submittedBuyRequest.data.createBuyRequest.notificationId);
    }

    if (acceptedBuyRequest) {
      return this.navigateToSingleBuyRequestScreen(submittedBuyRequest.data && submittedBuyRequest.data.createBuyRequest.notificationId);
    }
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
    const { submittedTextbook, submittedBuyRequest, acceptedBuyRequest } = this.state;

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

    if (acceptedBuyRequest) {
      return (
        <View style={successMessageWrapperStyle}>
          <Text style={successMessageHeaderStyle}>Success!</Text>
          <PhoneNumberContainer
            showPhoneNumber={true}
            showIcon={false}
            text={"Contact Mike to arrange a meetup"}
            phoneNumber="(817) 226 - 0183"
            onPhoneNumberPress={() => alert("open")}
            styles={{ outerContainerStyles: { flex: undefined, height: 100 }, innerContainerStyles: { paddingBottom: 0 } }}
          />
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

  renderAcceptedBuyRequestButtons() {
    return (
      <View style={buttonsWrapperStyle}>
        <Button
          raised
          primary
          upperCase={false}
          text="Send Message"
          onPress={() => openSms({ number: 8172260183, message: "temp placeholder" })}
          style={{ container: primaryButtonContainerStyle, text: primaryButtonTextStyle }}
        />
        <Button
          primary
          upperCase={false}
          text="View Buy Request"
          onPress={() => this.closeSuccessScreen()}
          style={{ container: secondaryButtonContainerStyle, text: secondaryButtonTextStyle }}
        />
      </View>
    )
  }

  renderButtons() {
    const { submittedTextbook, submittedBuyRequest, acceptedBuyRequest } = this.state;

    if (submittedTextbook) {
      return this.renderSubmittedTextbookButtons()
    }

    if (submittedBuyRequest) {
      return this.renderSubmittedBuyRequestButtons()
    }

    if (acceptedBuyRequest) {
      return this.renderAcceptedBuyRequestButtons()
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
