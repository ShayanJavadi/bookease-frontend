import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shape, func } from "prop-types";
import { NavigationActions } from "react-navigation"
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  }

  state = {
    context: undefined,
    textbookId: undefined,
    messageTextInputSelected: false,
    messageTextInputErrorMessage: undefined,
    message: "",
  }

  componentDidMount() {
    const { navigation, getTextbookQuery } = this.props;
    const params = navigation.state.params;

    if (params) {
      const { context, textbookId } = params;

      this.setState({ context, textbookId });
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
              borderColor: messageTextInputSelected || messageTextInputErrorMessage ? primaryColor : "#222",
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
          text="Send Request"
          style={{ container: buttonContainerStyle, text: buttonTextStyle }}
        />
      </View>
    )
  }

  render() {
    const { getTextbookQuery, navigation } = this.props;

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
          contentContainerStyle={{flexGrow: 1, backgroundColor: "#f1f1f1" }}
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
      </View>
    );
  }
}
