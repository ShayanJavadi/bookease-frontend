import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { func, shape } from "prop-types";
import BackButton from "src/modules/BackButton";
import Questions from "./Questions";
import BookImages from "./BookImages";
import BookDetails from "./BookDetails";
import AccountDetails from "./AccountDetails";
import { styles } from "./styles";



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
    const { book } = this.props.navigation.state.params;

    return (
      <View style={screenStyle}>
        <KeyboardAwareScrollView>
          <BookImages textbook={book} />
          <BookDetails textbook={book} />
          <AccountDetails textbook={book} />
          <Questions />
          <StatusBar hidden />
        </KeyboardAwareScrollView>
        {this.renderButtons()}
      </View>
    );
  }
}
