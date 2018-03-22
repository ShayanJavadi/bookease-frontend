import React, { Component } from "react";
import ReactNative, { View, ActivityIndicator, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
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
import PlaceholderView from "src/modules/PlaceholderView";
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
    getSessionQuery: func.isRequired,
  };

  state = {
    deleteTextbookModalVisible: false,
    isUserOwner: undefined,
    isImageSlideShowModalVisible: false,
    slideShowImages: undefined,
    slideShowImageIndex: 0,
    isComponentLoading: true,
    didRefetchAllData: undefined,
    textbookId: this.props.navigation.state.params ?
    this.props.navigation.state.params.textbookId :
    undefined
  }

  componentWillMount = async () => {
    if (!this.state.didRefetchAllData) {
      const { data: { getSession } } = await this.props.getSessionQuery.refetch();
      const { data: { getTextbook } } = await this.props.getTextbookQuery.refetch({ textbookId: this.state.textbookId });
      const userId = getSession.user && getSession.user.id;
      const isUserOwner = userId === getTextbook.userId;
      const slideShowImages = getTextbook.images.reduce((textbookImages, image) => {
        return [ ...textbookImages, { url: image.thumbnail }]
      }, []);

      this.setState({ slideShowImages, isComponentLoading: false, isUserOwner, didRefetchAllData: true });
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

  renderListingPlaceholder() {
    const placeholdersCount = 6;

    return (
      <View>
        <PlaceholderView styles={{ height: 350 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              size="large"
              color={uiTheme.tertiaryColorDark}
            />
          </View>
        </PlaceholderView>
        <View style={{ width: 375, height: 375, paddingHorizontal: 20, paddingTop: 53 }}>
          {[...Array(placeholdersCount)].map((curr, index) => (<PlaceholderView key={index} styles={{ marginBottom: 20 }} />))}
        </View>
      </View>
    )
  }

  renderListing() {
    const { getTextbookQuery, navigation, getSessionQuery } = this.props;
    const  { getTextbook } = getTextbookQuery
    const { isUserOwner, isComponentLoading } = this.state;
    const isTextbookQueryLoading = getTextbookQuery.loading || getSessionQuery.loading || !getTextbookQuery.getTextbook || isComponentLoading;

    if (isTextbookQueryLoading) {
      return this.renderListingPlaceholder();
    }

    return (
      <View>
        <BookImages
          textbook={getTextbook}
          isUserOwner={isUserOwner}
          onTopRightIconPress={() => alert("pressed")}
          navigation={navigation}
          onPress={() => this.setState({ isImageSlideShowModalVisible: true })}
          onCarouselIndexChange={(index) => this.setState({ slideShowImageIndex: index })}
        />
        <BookDetails
          textbook={getTextbook}
          isUserOwner={isUserOwner}
          onMiddleIconPress={() => this.scrollView.scrollToEnd()}
          onRightIconPress={() => this.scrollView.scrollToEnd()}
        />
        <AccountDetails textbook={getTextbook} />
        {this.renderBuyRequests(getTextbook.buyRequestNotifications)}
        <Questions
          ref={ref => this.questions = ref}
          isUserOwner={isUserOwner}
        />
      </View>
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

  renderButtonPlaceholders() {
    return (
      <FloatingBottomContainer>
        <PlaceholderView styles={[buttonWrapperStyle, { height: 40, marginHorizontal: 10 }]} />
        <PlaceholderView styles={[buttonWrapperStyle, { height: 40, marginHorizontal: 10 }]} />
      </FloatingBottomContainer>
    )
  }

  renderButtons() {
    // TODO: change to use getSession api
    const { isUserOwner, isComponentLoading } = this.state;
    const { getTextbookQuery, getSessionQuery } = this.props;
    const isTextbookQueryLoading = getTextbookQuery.loading || getSessionQuery.loading || !getTextbookQuery.getTextbook || isComponentLoading;

    if (isTextbookQueryLoading) {
      return this.renderButtonPlaceholders();
    }

    if (isUserOwner) {
      return this.renderSellerButtons();
    }

    return this.renderBuyerButtons();
  }

  renderSlideShowModal() {
    if (this.state.slideShowImages) {
      const { Modal } = ReactNative;

      return (
        <Modal visible={this.state.isImageSlideShowModalVisible} transparent={true} animated>
          <ImageViewer
            imageUrls={this.state.slideShowImages}
            onSwipeDown={() => {
              this.setState({ isImageSlideShowModalVisible: false })
            }}
            index={this.state.slideShowImageIndex}
          />
        </Modal>
      )
    }
  }

  render() {
    const { getTextbookQuery, getSessionQuery } = this.props;
    const { isComponentLoading } = this.state;
    const isTextbookQueryLoading = getTextbookQuery.loading || getSessionQuery.loading || !getTextbookQuery.getTextbook || isComponentLoading;

    return (
      <View style={screenStyle}>
        <KeyboardAwareScrollView
          innerRef={ref => {this.scrollView = ref}}
          scrollEnabled={!isTextbookQueryLoading}
        >
          {this.renderListing()}
        </KeyboardAwareScrollView>
        {this.renderButtons()}
        {this.renderDeleteTextbookModal()}
        {this.renderSlideShowModal()}
      </View>
    );
  }
}
