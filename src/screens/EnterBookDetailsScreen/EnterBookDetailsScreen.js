import React, { Component } from "react";
import { styles } from "./styles";
import BackButton from "src/modules/BackButton";
import NewBookForm from "src/modules/NewBookForm";

const {
  headerStyle,
  headerTitleStyle,
} = styles;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Enter Book Details",
    headerLeft: <BackButton navigation={navigation} buttonText="Back" />,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  });

  render() {
    const navigationState = this.props.navigation.state;
    const scannedBook = navigationState.params ? navigationState.params.scannedBook : undefined;
    return (
        <NewBookForm scannedBook={scannedBook} onSubmit={(values) =>console.log("Submitted!", JSON.stringify(values))}/> // eslint-disable-line no-console
    );
  }
}
