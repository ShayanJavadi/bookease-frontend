import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { func, shape } from "prop-types";
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
} = styles;

export default class SingleBookScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <BackButton navigation={navigation} headerLess={true} />,
  })

  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  componentDidMount() {
    const { getTextbookQuery, navigation } = this.props;
    getTextbookQuery.refetch({ textbookId: navigation.state.params.textbookId })
  }

  renderListing() {
    const { getTextbookQuery } = this.props;

    // TODO: implement optimistic loading
    if (getTextbookQuery.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: " center" }}>
          <ActivityIndicator
            size="large"
            color={uiTheme.tertiaryColorDark}
          />
        </View>
      )
    }
    const { getTextbook } = this.props.getTextbookQuery;
    console.log(getTextbook);
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

  renderButtons() {
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

  render() {
    console.log(this);
    const { getTextbook } = this.props.getTextbookQuery;

    return (
      <View style={screenStyle}>
        {this.renderListing()}

        {this.renderButtons()}
      </View>
    );
  }
}
