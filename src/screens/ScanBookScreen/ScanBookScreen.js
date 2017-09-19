import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";
import { Button } from "react-native-material-ui";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
} = styles;

export default class ScanBookScreen extends Component {
  state = {
    hasCameraPermission: null,
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    headerTitle: "Scan Book",
    headerLeft: <BackButton navigation={navigation} buttonText="Back" />,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeRead = ({ type, data }) => {
    const { refetch } = this.props.data;
    const exampleQuery = "discrete";

    refetch({ query: exampleQuery })
      .then(() => {
        const { navigation, data } = this.props;
        navigation.navigate("enterBookDetails", { scannedBook: data.lookupTextbooks.textbooks[0] } )
      })
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { refetch } = this.props.data;
    console.log(this);
    if (hasCameraPermission === null) {
      return (
        <View style={screenStyle}>
          <Text>Requesting for camera access...</Text>
        </View>
      )
    }
    if (hasCameraPermission === false) {
      return (
        <View style={screenStyle}>
          <Text>No access to camera...</Text>
        </View>
      )
    }

    return (
        <View style={screenStyle}>
          <Button
            raised
            text="Press me"
            onPress={this.handleBarCodeRead}
          />
        </View>
      );
    }
}
