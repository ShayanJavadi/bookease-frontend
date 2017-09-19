import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { isEmpty } from "lodash";
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
    bookIsScanned: false,
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
    this.props.resetQuery();

    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scannedTextbook) {
      this.props.navigation.navigate("enterBookDetails", { scannedTextbook: nextProps.scannedTextbook } )
    }
  }

  handleBarCodeRead = (barcodeData) => {
    const { fetchScannedBook, data } = this.props;

    fetchScannedBook(data.refetch, barcodeData);
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (this.props.loading) {
      return (
        <View style={screenStyle}>
          <Text>Loading...</Text>
        </View>
      )
    }
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
            onPress={() => this.handleBarCodeRead("math")}
          />
        </View>
      );
    }
}
