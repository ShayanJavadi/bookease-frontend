import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { shape, func, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "src/modules/Header";
import BackButton from "src/modules/BackButton";
import uiTheme from "src/common/styles";
import TextbookStrip from "./TextbookStrip";
import { styles } from "./styles";

const {
  screenStyle,
  messageTextInputStyle,
  messageTextInputContainerStyle,
  buttonContainerStyle,
  buttonTextStyle,
} = styles;

export default class BuyRequestScreen extends Component {
  static navigationOptions = () => ({
    tabBarVisible: false,
    header: null,
    gesturesEnabled: false,
  });

  static propTypes = {
    updateBuyRequestMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    getTextbookQuery: object.isRequired,
    createBuyRequestMutation: func.isRequired,
  }

  state = {
    context: undefined,
    textbookId: undefined,
    messageTextInputSelected: false,
    messageTextInputErrorMessage: undefined,
    message: "",
    isSubmitting: false,
    isUpdating: false,
    buyRequestToUpdate: undefined,
    spinnerMessage: "",
    updateMode: false,
  }

  componentDidMount() {
    const { navigation, getTextbookQuery } = this.props;
    const params = navigation.state.params;

    if (params) {
      const { context, textbookId, message = "", updateMode = false, buyRequestToUpdate } = params;

      this.setState({ context, textbookId, message, updateMode, buyRequestToUpdate });
      getTextbookQuery.refetch({ textbookId: textbookId });
    }
  }

  onBackPress() {
    const { context } = this.state;
    const { navigation } = this.props;

    if (context === "home") {
      navigation.goBack(null);
      navigation.goBack(null);
      return;
    }

    if (context === "singleBookScreen") {
      navigation.goBack(null);
      return;
    }

    navigation.goBack(null);
    navigation.goBack(null);
    return;
  }

  onTextbookStripPress() {
    const { context } = this.state;
    const { navigation } = this.props;

    if (context === "home") {
      return navigation.navigate("singleBookScreen", { textbookId: this.state.textbookId });
    }

    if (context === "singleBookScreen") {
      return navigation.goBack(null);
    }
  }

  onBuyRequestSubmitPress() {
    const { createBuyRequestMutation, updateBuyRequestMutation, getTextbookQuery } = this.props;
    if (this.state.updateMode) {
      const { buyRequestToUpdate } = this.state;
      const { id, textbookId, recipientId, notificationId } = buyRequestToUpdate;
      const valuesToUpdate = { id, textbookId, recipientId, message: this.state.message };

      return this.setState({ isSubmitting: true, spinnerMessage: "Updating your request..." }, () => {
        updateBuyRequestMutation({
          variables: {
            buyRequest: valuesToUpdate
          }
        })
          .then(() => {
            this.setState({ isSubmitting: false, spinnerMessage: "" });
            const resetAction = StackActions.reset({
              index: 2,
              key: null,
              actions: [
                NavigationActions.navigate({
                  routeName: "mainScreen",
                }),
                NavigationActions.navigate({
                  routeName: "singleBook",
                  params: {
                    textbookId: textbookId
                  }
                }),
                NavigationActions.navigate({
                  routeName: "singleNotificationScreen",
                  params: {
                    notificationType: "BUY_REQUEST", notificationId: notificationId
                  }
                })
              ],
            })

            this.props.navigation.dispatch(resetAction);
          })
      })
    }

    const buyRequestToCreate = {
      textbookId: getTextbookQuery.getTextbook.id,
      recipientId: getTextbookQuery.getTextbook.userId,
      message: this.state.message,
    }

    this.setState({ isSubmitting: true, spinnerMessage: "Submitting your request..." }, () => {
      createBuyRequestMutation({
        variables: {
          buyRequest: buyRequestToCreate
        }
      })
      .then(createdBuyRequest => {
        this.setState({ isSubmitting: false, spinnerMessage: "" });
        this.props.navigation.navigate("submissionSuccessScreen", { submittedBuyRequest: createdBuyRequest })
      })
    })
  }

  renderHeader() {
    return (
      <Header
        leftComponent={
          <BackButton
            navigation={this.props.navigation}
            onPress={() => this.onBackPress()}
          />
        }
        text="Create Buy Request"
       />
    )
  }

  renderMessageTextInput() {
    // TODO: prepopulate this text input with a template message (Hi, I'd like to buy textbookName etc etc)
    const { primaryColor } = uiTheme.palette;
    const { messageTextInputSelected, message, messageTextInputErrorMessage } = this.state;

    return (
      <View style={messageTextInputContainerStyle}>
        <TextField
          error={messageTextInputErrorMessage}
          label="*Message"
          title="Provide message copy"
          value={message}
          multiline={true}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={[
            messageTextInputStyle, {
              borderColor: messageTextInputSelected || messageTextInputErrorMessage ? primaryColor : "#fff",
            }
          ]}
          inputContainerStyle={{ height: 200 }}
          style={{ height: 160 }}
          characterRestriction={300}
          onChangeText={(message) => this.setState({ message })}
          onFocus={() => this.setState({ messageTextInputSelected: true })}
          onBlur={() => this.setState({ messageTextInputSelected: false })}
        />
      </View>
    )
  }

  renderSubmitButton() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1" }}>
        <Button
          raised
          primary
          text={this.state.updateMode ? "Update Request" : "Send Request"}
          style={{ container: buttonContainerStyle, text: buttonTextStyle }}
          onPress={() => this.onBuyRequestSubmitPress()}
        />
      </View>
    )
  }

  render() {
    const { getTextbookQuery } = this.props;
    const { isSubmitting, isUpdating, spinnerMessage } = this.state;

    if (getTextbookQuery.loading || !getTextbookQuery.getTextbook) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            size="large"
            color={uiTheme.tertiaryColorDark}
          />
        </View>
      )
    }

    return (
      <View style={screenStyle}>
        {this.renderHeader()}
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f1f1f1" }}
          extraScrollHeight={80}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <TextbookStrip
            textbook={getTextbookQuery.getTextbook}
            onPress={() => this.onTextbookStripPress()}
          />
          {this.renderMessageTextInput()}
          {this.renderSubmitButton()}
        </KeyboardAwareScrollView>
        <Spinner
          visible={isSubmitting || isUpdating}
          textContent={spinnerMessage}
          overlayColor="rgba(0, 0, 0, 0.65)"
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  }
}
