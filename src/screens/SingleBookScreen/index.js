import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo";
import { Button } from "react-native-material-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { func, shape, object, bool } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
} = styles;

export default class SingleBookScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <BackButton navigation={navigation} headerLess={true} />,
  })

  static propTypes = {

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
         colors={['rgba(0,0,0,0.6)', 'transparent']}
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
              text="Make Offer"
            />
          </View>
      </View>
    )
  }

  render() {
    return (
      <View style={screenStyle}>
        <KeyboardAwareScrollView>
          {this.renderBookImage()}
          {this.renderBookDetails()}
          {this.renderAccountDetails()}
          <StatusBar hidden />
        </KeyboardAwareScrollView>
        {this.renderButtons()}
      </View>
    );
  }
}
