import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import { object, bool, shape, func } from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { omit } from "lodash";
import { styles } from "./styles";
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
  cancelMeetingButtonWrapperStyle,
} = styles;

export default class SingleBuyRequest extends Component {
  static propTypes = {
   notification: object.isRequired,
   updateBuyRequest: func.isRequired,
   navigation: shape({
     navigate: func.isRequired
   }).isRequired,
   isLoading: bool.isRequired,
  }

  state = {
    isAcceptButtonModalVisible: false,
    isDeclineButtonModalVisible: false,
    isCancelButtonModalVisible: false,
  }

  onScheduleMeetingPress() {
    return openSms({ number: 8172260183, message: "Sample message goes here!!!!!!" });
  }

  updateBuyRequest(valuesToUpdate) {
    const { updateBuyRequest, notification } = this.props;
    const updatedBuyRequest = Object.assign({}, omit(notification.buyRequest, ["textbook", "__typename"]), valuesToUpdate);

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

  renderAcceptModal() {
    return (
      <Modal
        isVisible={this.state.isAcceptButtonModalVisible}
        text="Accept Mike's request?"
        actions={["cancel", "accept"]}
        onActionPress={(action) => this.onAcceptModalActionPress(action)}
      >
        <View style={{ paddingTop: 20 }}>
          <Text>Your phone numbers will be visible to each upon your acceptance.</Text>
        </View>
      </Modal>
    )
  }

  onCancelModalActionPress(action) {
    if (action === "discard") {
      this.updateBuyRequest({ isAccepted: false })
      .then(() => {
        return this.setState({ isCancelButtonModalVisible: false })
      })
    }

    return this.setState({ isCancelButtonModalVisible: false });
  }

  renderCancelModal() {
    return (
      <Modal
        isVisible={this.state.isCancelButtonModalVisible}
        text="Cancel Mike's request?"
        actions={["cancel", "discard"]}
        onActionPress={(action) => this.onCancelModalActionPress(action)}
      >
        <View style={{ paddingTop: 0 }}>
          <Text>This will cancel your acceptance of the request. You can always accept the request again if you change your mind.</Text>
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

    return (
      <FloatingBottomContainer height={250}>
        <PhoneNumberContainer
          showPhoneNumber={isAccepted}
          text={isAccepted ? "Schedule a meeting with Mike to finish the trade." : "Accept Mike\'s request to access his phone number."}
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
          <View style={cancelMeetingButtonWrapperStyle}>
            <Button
              style={{ container: declineButtonContainerStyle, text: declineButtonTextStyle }}
              primary
              onPress={() => this.setState({ isCancelButtonModalVisible: true })}
              text="Cancel"
            />
          </View>
          <View style={meetingButtonWrapperStyle}>
            <Button
              style={{ container: acceptButtonContainerStyle, text: acceptButtonTextStyle }}
              primary
              raised
              onPress={() => this.onScheduleMeetingPress()}
              text="Schedule Meeting"
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

    return (
      <View style={containerStyle}>
        <Header
          leftComponent={<BackButton navigation={navigation}/>}
          text="Mike's Buy Request"
        />
       <KeyboardAwareScrollView>
        {this.renderBuyRequestDetails(notification, navigation, isLoading)}
       </KeyboardAwareScrollView>
       {this.renderPhoneNumber(notification, isLoading)}
       {this.renderButtons(notification)}
       {this.renderAcceptModal()}
       {this.renderCancelModal()}
      </View>
    )
  }
}
