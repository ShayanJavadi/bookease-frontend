import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { func, string, shape } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { styles } from "./styles";

const {
  searchBarWrapperStyle,
  inputWrapperStyle,
  inputStyle,
  searchIconStyle,
  barCodeIconStyle,
} = styles;

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  }

  static propTypes = {
    search: func.isRequired,
    filterBy: string.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { filterBy, search } = this.props;

    if (filterBy !== nextProps.filterBy) {
      search(this.state.searchQuery);
    }

    const navigationParams = nextProps.navigation.state.params;
    const scannedTextbook = navigationParams ? navigationParams.scannedTextbook : undefined;

    if (scannedTextbook) {
      this.searchScannedTextbook(scannedTextbook);
    }
  }

  searchScannedTextbook(scannedTextbook) {
    this.setState({ searchQuery: scannedTextbook }, () => {
        this.props.search(scannedTextbook);
        const resetParams = NavigationActions.setParams({
          params: { scannedTextbook: undefined },
          key: "home",
        });

        this.props.navigation.dispatch(resetParams);
    });
  }

  onSearchInputChange(text) {
    this.setState({ searchQuery: text }, () => {
      this.props.search(text);
    });
  }

  render() {
    return (
      <View style={searchBarWrapperStyle}>
        <View style={inputWrapperStyle}>
          <MaterialIcons name="search" size={23} style={searchIconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Search for textbooks"
            underlineColorAndroid="transparent"
            value={this.state.searchQuery}
            onChangeText={(text) => this.onSearchInputChange(text)}
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate("scan", { context: "home" })}>
            <MaterialCommunityIcons name="barcode-scan" size={30} style={barCodeIconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
