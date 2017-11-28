import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator, Text } from "react-native";
import { Button, Dialog, DialogDefaultActions } from "react-native-material-ui";
import Modal from "react-native-modal";
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

const {
  screenStyle,
  buttonsWrapperStyle,
  buttonWrapperStyle,
  askButtonContainerStyle,
  askButtonTextStyle,
  offerButtonContainerStyle,
  offerButtonTextStyle,
  modalWrapperStyle
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
    getTextbookQuery.refetch({ textbookId: navigation.state.params.textbookId })
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

  renderDeleteTextbookModal() {
    const { Title, Actions } = Dialog;

    return (
      <Modal isVisible={this.state.deleteTextbookModalVisible} style={modalWrapperStyle}>
        <Dialog>
          <Title>
            <Text>Discard this listing?</Text>
          </Title>
          <Actions>
            <DialogDefaultActions
              actions={["cancel", "erase"]}
              onActionPress={(action) => this.onDeleteTextbookModalActionPress(action)}
            />
          </Actions>
        </Dialog>
      </Modal>
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
        <StatusBar hidden />
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
            text="Buy"
          />
        </View>
      </View>
    )
  }

  renderButtons() {
    // TODO: change to use getSession api
    const isUserOwner = true;

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
