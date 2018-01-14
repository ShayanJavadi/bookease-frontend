import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { func } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
  };

  componentWillReceiveProps(nextProps) {
    const { filterBy, search } = this.props;

    if (filterBy !== nextProps.filterBy) {
      search(this.state.searchQuery);
    }
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
          <MaterialCommunityIcons name="barcode-scan" size={30} style={barCodeIconStyle} />
        </View>
      </View>
    );
  }
}
