import React, { Component } from "react";
import { styles } from "./styles";
import BackButton from "src/modules/BackButton";
import NewBookForm from "src/modules/NewBookForm";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
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