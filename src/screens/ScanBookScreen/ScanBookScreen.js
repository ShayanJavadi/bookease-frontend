import React, { Component } from "react";
import { View } from "react-native";
import { NavigationActions } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo"; // eslint-disable-line no-unused-vars
import { func, shape, object, bool, string } from "prop-types";
import BackButton from "src/modules/BackButton";
import Header from "src/modules/Header";
import { styles } from "./styles";
import { Button } from "react-native-material-ui";
import { withNavigationFocus } from "react-navigation-is-focused-hoc";

const {
  screenStyle,
} = styles;

class ScanBookScreen extends Component {
  static propTypes = {
    data: object.isRequired,
    loading: bool.isRequired,
    resetQuery: func.isRequired,
    fetchScannedBook: func.isRequired,
    context: string.isRequired,
    isFocused: bool.isRequired,
    scannedTextbook: object,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  state = {
    hasCameraPermission: null,
    bookIsScanned: false,
    context: undefined,
  }

  static navigationOptions = () => ({
    tabBarVisible: false,
    header: null,
  });

  componentWillMount() {
    this.props.resetQuery();
  }

  navigateBack(scannedTextbook) {
    const { navigation } = this.props;
    const context = this.state.context;

    if (context === "enterBookDetails") {
      const resetAction = NavigationActions.reset({
         index: 1,
         key: null,
         actions: [
           NavigationActions.navigate({
             routeName: "mainScreen",
           }),
           NavigationActions.navigate({
             routeName: "sellBooks",
             params: { scannedTextbook: scannedTextbook },
           }),
         ],
       });

      return navigation.dispatch(resetAction);
    }

    if (context === "home") {
       const resetAction = NavigationActions.reset({
            index: 0,
            actions: [{
              type: "Navigation/INIT",
              routeName: "mainScreen",
              params: { scannedTextbook: scannedTextbook },
            }]
        });

      return navigation.dispatch(resetAction);
    }
  }

  componentWillReceiveProps({ navigation, scannedTextbook }) {
    const context = navigation.state.params ?
    navigation.state.params.context :
    undefined;

    this.setState({ context })

    if (this.props.scannedTextbook !== scannedTextbook) {
      this.navigateBack(scannedTextbook);
    }
  }

  handleBarCodeRead = (barcodeData) => {
    const { fetchScannedBook, data } = this.props;
    const context = this.state.context;

    if (context === "enterBookDetails") {
      return fetchScannedBook(data.refetch, barcodeData);
    }

    if (context === "home") {
      return this.navigateBack(barcodeData);
    }
  };

  render() {
    const error = this.props.data.error; // eslint-disable-line no-unused-vars
    if (!this.props.isFocused) {
      return null;
    }

    return (
      <View style={screenStyle}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button
            raised
            text="Press me"
            onPress={() => this.handleBarCodeRead("9781118324578")}
          />
        </View>
        <Header
          leftComponent={<BackButton navigation={this.props.navigation}/>}
          text="Scan Barcode"
        />
      </View>
    );
  }
}

export default withNavigationFocus(ScanBookScreen);
