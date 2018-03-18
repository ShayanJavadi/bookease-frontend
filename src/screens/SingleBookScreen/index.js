import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationActions } from "react-navigation";
import { func, shape, object } from "prop-types";
import { isEmpty } from "lodash";
import Questions from "./Questions";
import BookImages from "./BookImages";
import BookDetails from "./BookDetails";
import AccountDetails from "./AccountDetails";
import BuyRequestDetails from "src/modules/BuyRequestDetails";
import { styles } from "./styles";
import uiTheme from "src/common/styles";
import Modal from "src/modules/Modal";
import FloatingBottomContainer from "src/modules/FloatingBottomContainer";
import { NOTIFICATION_CONDITIONS } from "src/common/consts";

const {
  screenStyle,
  buttonWrapperStyle,
  ghostButtonContainerStyle,
  ghostButtonTextStyle,
  raisedButtonContainerStyle,
  raisedButtonTextStyle,
  buyRequestWrapperStyle,
  headerTextStyle,
  noBuyRequestsWrapperStyle,
  noBuyRequestsStyle,
} = styles;

export default class SingleBookScreen extends Component {
  static propTypes = {
    getTextbookQuery: object.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    deleteTextbookMutation: func.isRequired,
  };

  state = {
    deleteTextbookModalVisible: false,
    isUserOwner: true,
    textbookId: this.props.navigation.state.params ?
    this.props.navigation.state.params.textbookId :
    undefined
  }

  componentDidMount() {
    const { getTextbookQuery } = this.props;
    const { textbookId } = this.state;

    if (textbookId) {
      getTextbookQuery.refetch({ textbookId: textbookId })
    }
  }

  onDeleteTextbookPress() {
    this.setState({ deleteTextbookModalVisible: true })
  }

  onDeleteTextbookModalActionPress(action) {
    const { deleteTextbookMutation, getTextbookQuery } = this.props;

    if (action === "erase") {
      deleteTextbookMutation({
        variables: {
          textbookId: getTextbookQuery.getTextbook.id
        }
      })
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: "mainScreen",
            })
          ],
        })

        this.props.navigation.dispatch(resetAction)
      })
    }

    this.setState({ deleteTextbookModalVisible: false });
  }

  onBuyButtonPress() {
    const { navigation, getTextbookQuery } = this.props;

    navigation.navigate("buyRequestScreen", { textbookId: getTextbookQuery.getTextbook.id, context: "singleBookScreen" });
  }

  renderDeleteTextbookModal() {
    return (
      <Modal
        isVisible={this.state.deleteTextbookModalVisible}
        text="Discard this listing?"
        textStyle={{ fontSize: 18 }}
        actions={["cancel", "erase"]}
        onActionPress={(action) => this.onDeleteTextbookModalActionPress(action)}
      />
    )
  }

  renderBuyRequestDetails(notifications) {
    if (!isEmpty(notifications)) {
      const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;
      const { navigation } = this.props;

      return notifications.map(notification => {
        return (
          <View style={buyRequestWrapperStyle} key={notification.id}>
            <BuyRequestDetails
              notification={notification}
              navigation={navigation}
              isReversed
              isCompact
              onPress={() => navigation.navigate("singleNotificationScreen", { notificationType: BUY_REQUEST, notificationId: notification.id })}
            />
          </View>
        )
      })
    }

    return (
      <View style={noBuyRequestsWrapperStyle}>
        <Text style={noBuyRequestsStyle}>
          Your buy requests will appear here.
        </Text>
      </View>
    )
  }

  renderBuyRequests(notifications) {
    // TODO: denote that this is only visible to hte owner
    // "only visible to you "
    return (
      <View>
        <Text style={headerTextStyle}>Buy Requests</Text>
        {this.renderBuyRequestDetails(notifications)}
      </View>
    )
  }

  renderListing() {
    const { getTextbookQuery: { getTextbook }, navigation } = this.props;
    const { isUserOwner } = this.state;

    return (
      <KeyboardAwareScrollView
        innerRef={ref => {this.scrollView = ref}}
      >
        <BookImages
          textbook={getTextbook}
          isUserOwner={isUserOwner}
          onTopRightIconPress={() => alert("pressed")}
          navigation={navigation}
        />
        <BookDetails
          textbook={getTextbook}
          isUserOwner={isUserOwner}
          onLeftIconPress={() => this.scrollView.scrollTo({ x: 0, y: 450, animated: true })}
          onRightIconPress={() => this.scrollView.scrollTo({ x: 0, y: 550, animated: true })}
        />
        {
          isUserOwner ?
          this.renderBuyRequests(getTextbook.buyRequestNotifications) :
          <AccountDetails textbook={getTextbook} />
        }
        <Questions
          isUserOwner={isUserOwner}
        />
      </KeyboardAwareScrollView>
    )
  }

  renderSellerButtons() {
    const { navigation, getTextbookQuery } = this.props;

    return (
      <FloatingBottomContainer>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: ghostButtonContainerStyle, text: ghostButtonTextStyle }}
            primary
            onPress={() => navigation.navigate("sellBooks", { textbookIdToUpdate: getTextbookQuery.getTextbook.id })}
            text="Edit"
          />
        </View>
        <View style={[buttonWrapperStyle, { flex: 2 }]}>
          <Button
            style={{ container: raisedButtonContainerStyle, text: raisedButtonTextStyle }}
            primary
            raised
            onPress={() => this.scrollView.scrollTo({ x: 0, y: 700, animated: true })}
            text={`Buy Requests (${getTextbookQuery.getTextbook.buyRequestNotifications.length})`}
          />
        </View>
      </FloatingBottomContainer>
    )
  }

  renderBuyerButtons() {
    return (
      <FloatingBottomContainer>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: ghostButtonContainerStyle, text: ghostButtonTextStyle }}
            primary
            text="Ask"
          />
        </View>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: raisedButtonContainerStyle, text: raisedButtonTextStyle }}
            primary
            raised
            onPress={() => this.onBuyButtonPress()}
            text="Buy"
          />
        </View>
      </FloatingBottomContainer>
    )
  }

  renderButtons() {
    // TODO: change to use getSession api
    const { isUserOwner } = this.state;

    if (isUserOwner) {
      return this.renderSellerButtons();
    }

    return this.renderBuyerButtons();
  }

  render() {
    const { getTextbookQuery } = this.props;
    const isTextbookQueryLoading = getTextbookQuery.loading || !getTextbookQuery.getTextbook;

    if (isTextbookQueryLoading) {
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
        {this.renderListing()}
        {this.renderButtons()}
        {this.renderDeleteTextbookModal()}
      </View>
    );
  }
}
