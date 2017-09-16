import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import BackButton from "src/modules/BackButton";
import NewBookForm from "src/modules/NewBookForm";
import PictureInput from "src/modules/PictureInput";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  pictureInputWrapperStyle,
  formWrapperStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
  pictureInputStyle,
  inputStyle,
  inputWrapperStyle,
  bookTitleInputWrapperStyle,
  bookTitleInputStyle,
  bookIsbnWrapperStyle,
  bookIsbnInputStyle,
  bookEditionWrapperStyle,
  bookEditionInputStyle,
  bookAuthorInputStyle,
  bookConditionWrapperStyle,
  bookPriceInputStyle,
  bookConditionInputStyle,
  horizantalLineStyle
} = styles;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    headerTitle: "Enter Book Details",
    headerLeft: <BackButton navigation={navigation} buttonText="Back" />,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  render() {
    return (
        <NewBookForm onSubmit={(values) =>console.log('Submitted!', JSON.stringify(values))}/>
    );
  }
}
