import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationActions } from "react-navigation";
import { func, shape, object } from "prop-types";
import BackButton from "src/modules/BackButton";
import Questions from "./Questions";
import BookImages from "./BookImages";
import BookDetails from "./BookDetails";
import AccountDetails from "./AccountDetails";
import { styles } from "./styles";
import uiTheme from "src/common/styles";
import Modal from "src/modules/Modal";

const {
  screenStyle,
  buttonsWrapperStyle,
  buttonWrapperStyle,
  askButtonContainerStyle,
  askButtonTextStyle,
  offerButtonContainerStyle,
  offerButtonTextStyle,
} = styles;

export default class SingleBookScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <BackButton navigation={navigation} headerLess={true} />,
  })

  static propTypes = {
    getTextbookQuery: object.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    deleteTextbookMutation: func.isRequired,
  };

  state = {
    deleteTextbookModalVisible: false,
  }

  componentDidMount() {
    const { getTextbookQuery, navigation } = this.props;
    if (navigation.state.params) {
      getTextbookQuery.refetch({ textbookId: navigation.state.params.textbookId });
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

  renderListing() {
    const { getTextbook } = this.props.getTextbookQuery;

    return (
      <KeyboardAwareScrollView>
        <BookImages textbook={getTextbook} />
        <BookDetails textbook={getTextbook} />
        <AccountDetails textbook={getTextbook} />
        <Questions />
      </KeyboardAwareScrollView>
    )
  }

  renderSellerButtons() {
    const { navigation, getTextbookQuery } = this.props;

    return (
      <View style={buttonsWrapperStyle}>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: askButtonContainerStyle, text: askButtonTextStyle }}
            primary
            onPress={() => this.onDeleteTextbookPress()}
            text="Delete"
          />
        </View>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: offerButtonContainerStyle, text: offerButtonTextStyle }}
            primary
            raised
            onPress={() => navigation.navigate("sellBooks", { textbookIdToUpdate: getTextbookQuery.getTextbook.id })}
            text="Edit"
          />
        </View>
      </View>
    )
  }

  renderBuyerButtons() {
    return (
      <View style={buttonsWrapperStyle}>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: askButtonContainerStyle, text: askButtonTextStyle }}
            primary
            text="Ask"
          />
        </View>
        <View style={buttonWrapperStyle}>
          <Button
            style={{ container: offerButtonContainerStyle, text: offerButtonTextStyle }}
            primary
            raised
            onPress={() => this.onBuyButtonPress()}
            text="Buy"
          />
        </View>
      </View>
    )
  }

  renderButtons() {
    // TODO: change to use getSession api
    const isUserOwner = false;

    if (isUserOwner) {
      return this.renderSellerButtons();
    }

    return this.renderBuyerButtons();
  }

  render() {
    const { getTextbookQuery } = this.props;

    // TODO: implement optimistic loading
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
        {this.renderListing()}
        {this.renderButtons()}
        {this.renderDeleteTextbookModal()}
      </View>
    );
  }
}
