import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { func, shape } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const questions = [
  {
    username: "Renato Principe",
    userAvatar: "https://media.licdn.com/media/AAEAAQAAAAAAAAR6AAAAJDVjYjI4MDFlLTBkNDAtNDE1Ny04NjYyLWViOWU3YzljNGNhZQ.jpg",
    text: "Does this book go over clowns, farming, and algorithms?",
    recipient: null,
    date: "1h",
  },
  {
    username: "Shayan Javadi",
    userAvatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA0-AAAAJDFjZWI5ZjE2LTljMTktNDA5NS04NmIzLTcyYTI0YzdmODRhZQ.jpg",
    text: "Yes it does!",
    recipient: "Renato Principe",
    date: "32m",
  },
];

const {
  screenStyle,
  bookImageWrapperStyle,
  bookImageStyle,
  favoriteButtonWrapperStyle,
  bookImageLinearGradientStyle,
  bookDetailsWrapperStyle,
  bookDetailsTitleWrapperStyle,
  bookDetailsTitleStyle,
  bookDetailsTextWrapperStyle,
  bookDetailsTextKeyStyle,
  bookDetailsTextValueStyle,
  priceChipWrapperStyle,
  priceChipStyle,
  accountDetailsWrapperStyle,
  accountDetailsNameStyle,
  accountDetailsPostedStyle,
  buttonsWrapperStyle,
  buttonWrapperStyle,
  askButtonContainerStyle,
  askButtonTextStyle,
  bookDetailsLowerSectionWrapper,
  bookDescriptionWrapperStyle,
  bookDescriptionStyle,
  offerButtonContainerStyle,
  offerButtonTextStyle,
  questionsWrapperStyle,
  questionsTitleWrapperStyle,
  questionsTitleStyle,
  questionWrapperStyle,
  questionUsernameStyle,
  questionUserAvatarStyle,
  questionTextStyle,
  questionRecipientStyle,
  questionDateWrapperStyle,
  questionDateStyle,
  noQuestionsWrapperStyle,
  noQuestionsStyle,
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

  renderBookImage() {
    const { thumbnail, price } = this.props.navigation.state.params.book;

    return (
      <View style={bookImageWrapperStyle}>
        <Image
          style={bookImageStyle}
          source={{ uri: thumbnail }}
        />
        <TouchableOpacity style={favoriteButtonWrapperStyle}>
            <MaterialCommunityIcons size={30} color="#fff" name="heart-outline" />
        </TouchableOpacity>
        <View style={priceChipWrapperStyle}>
          <Text style={priceChipStyle}>${price}</Text>
        </View>
        <LinearGradient
         colors={["rgba(0,0,0,0.6)", "transparent"]}
         style={bookImageLinearGradientStyle}
       />
      </View>
    )
  }

  renderBookDetails() {
    const { name, author, condition, isbn, edition } = this.props.navigation.state.params.book;

    return (
      <View style={bookDetailsWrapperStyle}>
        <View style={{ flex: 2 }}>
          <View style={bookDetailsTitleWrapperStyle}>
              <View style={{ flexDirection: "row" }}>
                <Text style={bookDetailsTitleStyle}>{name}</Text>
              </View>
          </View>
          <View style={bookDetailsTextWrapperStyle}>
            <View style={{ flexDirection: "row" }}>
              <Text style={bookDetailsTextKeyStyle}>Condition: </Text>
              <Text style={bookDetailsTextValueStyle}>{condition}</Text>
            </View>
          </View>
          <View style={bookDetailsTextWrapperStyle}>
            <View style={{ flexDirection: "row"  }}>
              <Text style={bookDetailsTextKeyStyle}>Author: </Text>
              <Text style={bookDetailsTextValueStyle}>{author}</Text>
            </View>
          </View>
          <View style={bookDetailsTextWrapperStyle}>
            <View style={{ flexDirection: "row"  }}>
              <Text style={bookDetailsTextKeyStyle}>Edition: </Text>
              <Text style={bookDetailsTextValueStyle}>{edition}</Text>
            </View>
          </View>
          <View style={bookDetailsTextWrapperStyle}>
            <View style={{ flexDirection: "row"  }}>
              <Text style={bookDetailsTextKeyStyle}>ISBN: </Text>
              <Text style={bookDetailsTextValueStyle}>{isbn}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderAccountDetails() {
    const { owner, description } = this.props.navigation.state.params.book;

    return (
      <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
        <View style={bookDetailsLowerSectionWrapper}>
          <View style={accountDetailsWrapperStyle}>
            <View style={{ flex: 1 }}>
              <MaterialIcons name="account-circle" size={75} style={{ color: "#ccc" }} />
            </View>
            <View style={{ flex: 3, paddingBottom: 3 }}>
              <Text style={accountDetailsNameStyle}>{owner}</Text>
              <Text style={accountDetailsPostedStyle}>Posted 3 hours ago</Text>
            </View>
            <View style={{ flex: .5 }}>
              <MaterialIcons name="navigate-next" size={30} style={{ color: "#ccc" }} />
            </View>
          </View>
          <View style={bookDescriptionWrapperStyle}>
            <Text style={bookDescriptionStyle}>{description}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

  fetchQuestions() {
      if (questions) {
        return questions.map((question, index) => (
          <View style={questionWrapperStyle} key={index}>
            <View style={{ flex: 1 }}>
              <Image
                style={questionUserAvatarStyle}
                source={{ uri: question.userAvatar }}
              />
            </View>
            <View style={{ flex: 3.4 }}>
              <Text style={questionUsernameStyle}>{question.username}</Text>
                <Text style={questionTextStyle}><Text style={questionRecipientStyle}>
                  {question.recipient ? `\@${question.recipient} ` : null}
                </Text>
                {question.text}
              </Text>
            </View>
            <View style={questionDateWrapperStyle}>
              <Text style={questionDateStyle}>{question.date}</Text>
            </View>
          </View>
        ));
      }

      return (
        <View style={noQuestionsWrapperStyle}>
          <Text style={noQuestionsStyle}>{
            'Have questions\? Press the "ASK" button to ask them.' // eslint-disable-line quotes
          }</Text>
        </View>
      );
  }

  renderQuestions() {
    return (
      <View style={questionsWrapperStyle}>
        <View style={questionsTitleWrapperStyle}>
          <View style={{ flex: 1 }}>
            <Text style={questionsTitleStyle}>Questions & Answers</Text>
          </View>
        </View>
       {this.fetchQuestions()}

      </View>
    );
  }

  render() {
    return (
      <View style={screenStyle}>
        <KeyboardAwareScrollView>
          {this.renderBookImage()}
          {this.renderBookDetails()}
          {this.renderAccountDetails()}
          {this.renderQuestions()}
          <StatusBar hidden />
        </KeyboardAwareScrollView>
        {this.renderButtons()}
      </View>
    );
  }
}
