import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const {
  headerStyle,
  headerTitleStyle,
} = styles;


export default class ScanBookScreen extends Component {
  state = {
    hasCameraPermission: null,
  };

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Scan Book",
    headerLeft: <BackButton navigation={navigation} buttonText="Back" />,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  });

  handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

}
