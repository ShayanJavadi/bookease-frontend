import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { func, string, shape } from "prop-types";
import ModalSelector from "react-native-modal-selector"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { styles } from "./styles";
import { SEARCH_FILTERS } from "src/common/consts";


const {
  searchBarWrapperStyle,
  inputWrapperStyle,
  inputStyle,
  searchIconStyle,
  barCodeScanWrapperStyle,
  barCodeIconStyle,
  filterIconStyle,
  clearSearchIconWrapperStyle,
  clearSearchIconStyle,
} = styles;

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
    isSearchInputFocused: undefined,
  }

  static propTypes = {
    search: func.isRequired,
    filterBy: string.isRequired,
    onFilterChange: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  createDropDownData = () => {
    return (
      SEARCH_FILTERS.reduce((searchFilters, searchFilter, currentIndex) => {
        searchFilters.push({
          key: currentIndex,
          label: searchFilter.humanizedValue,
          value: searchFilter.value
        });

        return searchFilters;
      }, [{
        key: Math.random(),
        section: true,
        label: "Filter By:",
      }])
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  renderSearchInput = () => (
    <TextInput
      style={inputStyle}
      placeholder="Search for textbooks"
      underlineColorAndroid="transparent"
      value={this.state.searchQuery}
      onChangeText={(text) => this.onSearchInputChange(text)}
      autoCorrect={false}
      onFocus={() => this.setState({ isSearchInputFocused: true })}
      onBlur={() => this.setState({ isSearchInputFocused: false })}
    />
  )

  renderClearSearchInputIcon = () => (
    <View style={clearSearchIconWrapperStyle}>
        {
          this.state.isSearchInputFocused &&
          <TouchableOpacity style={clearSearchIconStyle} onPress={() => this.setState({ searchQuery: "" })}>
            <MaterialCommunityIcons name="window-close" size={15} style={{ color: "#ccc" }} />
          </TouchableOpacity>

        }
    </View>
  )

  renderScanButton = () => (
    <View style={barCodeScanWrapperStyle}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("scan", { context: "home" })}  >
        <MaterialCommunityIcons name="barcode-scan" size={30} style={barCodeIconStyle} />
      </TouchableOpacity>
    </View>
  )

  renderFilterButton = () => {
    const { filterBy } = this.props;
    return (
      <ModalSelector
        data={this.createDropDownData()}
        onChange={({ value }) => this.props.onFilterChange(value)}
      >
        {
          filterBy === "price-low-to-high" || filterBy === "price-high-to-low" ?
          <MaterialCommunityIcons name={filterBy === "price-low-to-high" ? "sort-ascending" : "sort-descending"} size={30} style={filterIconStyle} /> :
          <MaterialIcons name="sort" size={30} style={filterIconStyle} />
        }
      </ModalSelector>
    )
  }

  render() {
    return (
      <View style={searchBarWrapperStyle}>
        <View style={inputWrapperStyle}>
          <MaterialIcons name="search" size={23} style={searchIconStyle} />
          {this.renderSearchInput()}
          {this.renderClearSearchInputIcon()}
          {this.renderScanButton()}
          {this.renderFilterButton()}
        </View>
      </View>
    );
  }
}
