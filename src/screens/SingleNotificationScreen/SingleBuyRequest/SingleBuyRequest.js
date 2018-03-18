import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button } from "react-native-material-ui";
import { object, bool, shape, func } from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { omit } from "lodash";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, palette } from "./styles";
import Header from "src/modules/Header";
import BackButton from "src/modules/BackButton";
import BuyRequestDetails from "src/modules/BuyRequestDetails";
import FloatingBottomContainer from "src/modules/FloatingBottomContainer";
import PhoneNumberContainer from "src/modules/PhoneNumberContainer";
import Modal from "src/modules/Modal";
import openSms from "src/common/lib/openSms";

const {
  containerStyle,
  buttonWrapperStyle,
  declineButtonContainerStyle,
  declineButtonTextStyle,
  acceptButtonContainerStyle,
  acceptButtonTextStyle,
  activityIndicatorWrapper,
  meetingButtonWrapperStyle,
  markAsDoneButtonWrapperStyle,
  markAsDoneModalRadioButtonWrapperStyle,
  markAsDoneModalRadioButtonTextStyle,
} = styles;

export default class SingleBuyRequest extends Component {
  static propTypes = {
   notification: object.isRequired,
   updateBuyRequest: func.isRequired,
   createTextbookSale: func.isRequired,
   navigation: shape({
     navigate: func.isRequired
   }).isRequired,
   isLoading: bool.isRequired,
  }

  state = {
    isAcceptButtonModalVisible: false,
    isDeclineButtonModalVisible: false,
    isMarkAsDoneModalVisible: false,
    isDidSellTextbookButtonPressed: false,
    isDidNotSellTextbookButtonPressed: false,
    isRedirectingToSMS: false,
    isCreatingTextbookSale: false,
    spinnerMessage: "",
  }

  onScheduleMeetingPress() {
    this.setState({ isRedirectingToSMS: true });

    return openSms({
      number: 8172260183, message: "Sample message goes here!!!!!!"
    })
    .then(() => {
      this.setState({ isRedirectingToSMS: false, spinnerMessage: "Redirecting to Messages" })
    })
  }

  updateBuyRequest(valuesToUpdate) {
    const { updateBuyRequest, notification } = this.props;
    const updatedBuyRequest = Object.assign({}, omit(notification.buyRequest, ["textbook", "isTextbookSold", "__typename"]), valuesToUpdate);

    return updateBuyRequest({
      variables: {
        buyRequest: updatedBuyRequest,
      }
    })
  }

  onAcceptModalActionPress(action) {
    if (action === "accept") {
      return this.updateBuyRequest({ isAccepted: true })
      .then(({ data }) => {
        this.setState({ isAcceptButtonModalVisible: false })
        return this.props.navigation.navigate("submissionSuccessScreen", { acceptedBuyRequest: data.updateBuyRequest })
      })
    }

    return this.setState({ isAcceptButtonModalVisible: false });
  }

  renderAcceptModal(displayName) {
    return (
      <Modal
        isVisible={this.state.isAcceptButtonModalVisible}
        text={`Accept ${displayName}'s request?`}
        actions={["cancel", "accept"]}
        onActionPress={(action) => this.onAcceptModalActionPress(action)}
      >
        <View style={{ paddingTop: 20 }}>
          <Text>Your phone numbers will be visible to each other after you accept.</Text>
        </View>
      </Modal>
    )
  }

  onMarkAsDoneModalActionPress(action) {
    const { isDidSellTextbookButtonPressed, isDidNotSellTextbookButtonPressed } = this.state;
    const { notification: { buyRequest }, createTextbookSale } = this.props;

    if (action === "ok") {
      if (isDidNotSellTextbookButtonPressed) {
        this.setState({ isMarkAsDoneModalVisible: false });
        return this.updateBuyRequest({ isAccepted: false });
      }

      if (isDidSellTextbookButtonPressed) {
        this.setState({ isMarkAsDoneModalVisible: false, isCreatingTextbookSale: true, spinnerMessage: "" });

        return createTextbookSale({
          variables: {
            textbookSale: {
              buyerId: buyRequest.userId,
              textbookId: buyRequest.textbookId,
              buyRequestId: buyRequest.id,
            }
          }
        })
        .then(() => {
          this.setState({ isCreatingTextbookSale: true });
          return;
        })
      }
    }

    return this.setState({ isMarkAsDoneModalVisible: false });
  }

  renderMarkAsDoneModal() {
    const { primaryColor } = palette;
    const { isDidSellTextbookButtonPressed, isDidNotSellTextbookButtonPressed } = this.state;
    const hasUserSelectedButton = isDidSellTextbookButtonPressed || isDidNotSellTextbookButtonPressed;

    return (
      <Modal
        isVisible={this.state.isMarkAsDoneModalVisible}
        text="Mark as done"
        actions={["cancel", "ok"]}
        options={{ ok: { disabled: !hasUserSelectedButton } }}
        onActionPress={(action) => this.onMarkAsDoneModalActionPress(action)}
      >
        <View style={{ paddingTop: 0, flex: 1 }}>
          <TouchableOpacity onPress={() => this.setState({ isDidSellTextbookButtonPressed: true, isDidNotSellTextbookButtonPressed: false })} style={[markAsDoneModalRadioButtonWrapperStyle, { paddingBottom: 20 }]}>
            <MaterialIcons
              size={30}
              color={isDidSellTextbookButtonPressed ? primaryColor : "#666"}
              name={isDidSellTextbookButtonPressed ? "radio-button-checked" : "radio-button-unchecked"}
            />
            <Text style={markAsDoneModalRadioButtonTextStyle}>I sold my textbook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ isDidSellTextbookButtonPressed: false, isDidNotSellTextbookButtonPressed: true })} style={markAsDoneModalRadioButtonWrapperStyle}>
            <MaterialIcons
              size={30}
              color={isDidNotSellTextbookButtonPressed ? primaryColor : "#666"}
              name={isDidNotSellTextbookButtonPressed ? "radio-button-checked" : "radio-button-unchecked"}
            />
            <Text style={markAsDoneModalRadioButtonTextStyle}>I did not sell my textbook</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderBuyRequestDetails() {
    const { notification, navigation, isLoading } = this.props;

    if (isLoading) {
      return (
        <View style={activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )
    }

    if (notification) {
      return (
        <View style={{ flex: 1 }}>
          <BuyRequestDetails
            notification={notification}
            navigation={navigation}
            isExpanded
          />
        </View>
      )
    }
  }

  renderPhoneNumber() {
    const { notification, isLoading } = this.props;

    if (isLoading || !notification) {
      return null;
    }

    const { isAccepted } = notification.buyRequest;
    const { displayName } = notification.user;

    return (
      <FloatingBottomContainer height={250}>
        <PhoneNumberContainer
          showPhoneNumber={isAccepted}
          text={isAccepted ? `Message ${displayName} to arrange a meetup` : `Accept ${displayName}\'s request to exchange phone numbers`}
          phoneNumber="(817) 226 - 0183"
          onPhoneNumberPress={() => isAccepted && this.onScheduleMeetingPress()}
        />
      </FloatingBottomContainer>
    )
  }

  renderButtons() {
    const { notification } = this.props;

    if (notification && notification.buyRequest.isAccepted) {
      return (
        <FloatingBottomContainer>
          <View style={markAsDoneButtonWrapperStyle}>
            <Button
              style={{ container: declineButtonContainerStyle, text: declineButtonTextStyle }}
              primary
              onPress={() => this.setState({ isMarkAsDoneModalVisible: true })}
              text="Mark as Done"
            />
          </View>
          <View style={meetingButtonWrapperStyle}>
            <Button
              style={{ container: acceptButtonContainerStyle, text: acceptButtonTextStyle }}
              primary
              raised
              onPress={() => this.onScheduleMeetingPress()}
              text="Message"
            />
          </View>
        </FloatingBottomContainer>
      )
    }

    return (
      <FloatingBottomContainer>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: declineButtonContainerStyle, text: declineButtonTextStyle }}
            primary
            onPress={() => alert("decline")}
            text="Decline"
          />
        </View>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: acceptButtonContainerStyle, text: acceptButtonTextStyle }}
            primary
            raised
            onPress={() => this.setState({ isAcceptButtonModalVisible: true })}
            text="Accept"
          />
        </View>
      </FloatingBottomContainer>
    )
  }

  render() {
    const { notification, navigation, isLoading } = this.props;
    const { isCreatingTextbookSale, isRedirectingToSMS, spinnerMessage } = this.state;
    const shouldShowSpinner = isCreatingTextbookSale || isRedirectingToSMS;
    return (
      <View style={containerStyle}>
        <Header
          leftComponent={<BackButton navigation={navigation}/>}
          text="Buy Request"
        />
       <KeyboardAwareScrollView>
        {this.renderBuyRequestDetails(notification, navigation, isLoading)}
       </KeyboardAwareScrollView>
       {this.renderPhoneNumber(notification, isLoading)}
       {this.renderButtons(notification)}
       {notification && this.renderAcceptModal(notification.user.displayName)}
       {this.renderMarkAsDoneModal()}
       <Spinner
         visible={shouldShowSpinner}
         textContent={spinnerMessage}
         overlayColor="rgba(0, 0, 0, 0.65)"
         textStyle={{ color: "#fff" }}
       />
      </View>
    )
  }
}
