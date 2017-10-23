import React, { Component } from "react";
import { Text, View } from "react-native";
import MaterialTabs from "react-native-material-tabs";
import { shape, func } from "prop-types";
import BackButton from "src/modules/BackButton";

import { styles, TAB_INDICATOR_COLOR } from "./styles";

const { headerStyle, headerTitleStyle, tabWrapperStyle } = styles;

export default class MyBooksTabBarComponent extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  state = {
   selectedTab: 0
  };

  onListingsPress = () => {
    this.props.navigation.navigate("myBooksListings");
  };

  onOrdersPress = () => {
    this.props.navigation.navigate("myBooksOrders");
  };

  onBookmarksPress = () => {
    this.props.navigation.navigate("myBooksBookmarks");
  };

  setTab = (tabIndex) => {
    this.setState({ selectedTab: tabIndex })
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedTab === this.state.selectedTab) {
      return;
    }

    if (nextState.selectedTab === 0) {
      this.onListingsPress();
    }

    if (nextState.selectedTab === 1) {
      this.onOrdersPress();
    }

    if (nextState.selectedTab === 2) {
      this.onBookmarksPress();
    }
  }

  render() {
    return (
      <View style={tabWrapperStyle}>
        <View style={headerStyle}>
          <Text style={headerTitleStyle}>My Books</Text>
        </View>
        <MaterialTabs
          items={["Selling", "Buying", "Bookmarks"]}
          selectedIndex={this.state.selectedTab}
          onChange={(tabIndex) => this.setTab(tabIndex)}
          barColor="#fff"
          indicatorColor={TAB_INDICATOR_COLOR}
          activeTextColor={TAB_INDICATOR_COLOR}
          inactiveTextColor="#888"
        />
      </View>
    );
  }
}
