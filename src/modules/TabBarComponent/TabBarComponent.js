import React, { Component } from "react";
import { View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import { func, shape } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BottomNavigation, { Tab } from "react-native-material-bottom-navigation"
import {
  styles,
  BOTTOM_NAVIGATION_ICON_SIZE,
  ACTION_BUTTON_COLOR,
  TAB_COLOR,
} from "./styles";

const {
  sellBooksButtonStyle,
  bottomNavigationStyle,
  ActionButtonFontStyle,
 } = styles;

export default class TabBarComponent extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  state = {
    selectedTab: 0
  };

  onHomePress = () => {
    this.props.navigation.navigate("home");
  };

  onMyBooksPress = () => {
    this.props.navigation.navigate("myBooks");
  };

  onManuallyEnterBookPress = () => {
    this.props.navigation.navigate("sellBooks");
  };

  onScanBookPress = () => {
    this.props.navigation.navigate("scanBook");
  };

  onNotificationsPress = () => {
    this.props.navigation.navigate("notifications");
  };

  onAccountPress = () => {
    this.props.navigation.navigate("account");
  };

  setTab = (tabIndex) => {
    this.setState({ selectedTab: tabIndex })
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedTab === this.state.selectedTab) {
      return;
    }

    if (nextState.selectedTab === 0) {
      this.onHomePress();
    }

    if (nextState.selectedTab === 1) {
      this.onMyBooksPress();
    }

    if (nextState.selectedTab === 2) {
      this.onNotificationsPress();
    }

    if (nextState.selectedTab === 3) {
      this.onAccountPress();
    }
  }

  renderBottomNavigation() {
    return (

      <BottomNavigation
        activeTab={this.state.selectedTab}
        labelColor="white"
        rippleColor="white"
        shifting={false}
        style={bottomNavigationStyle}
        onTabChange={(newTabIndex) => this.setTab(newTabIndex)}
      >
        <Tab
          barBackgroundColor={TAB_COLOR}
          label="Home"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="home" />}
        />
        <Tab
          barBackgroundColor={TAB_COLOR}
          label="My Books"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="book-open-variant" />}
        />
        <Tab
          barBackgroundColor={TAB_COLOR}
          label="Notifications"
          icon={<MaterialIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="mail" />}
        />
        <Tab
          barBackgroundColor={TAB_COLOR}
          label="Account"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="account" />}
        />
      </BottomNavigation>
    )
  }

  renderActionButton() {
    return (
      <View style={sellBooksButtonStyle}>
        <ActionButton
          buttonColor={ACTION_BUTTON_COLOR}
          position="right"
          degrees={0}
          icon={
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <MaterialCommunityIcons name="camera" size={25} style={{ color: "#fff", marginTop: 2 }}/>
              <Text style={ActionButtonFontStyle}>SELL</Text>
            </View>
          }
          onPress={() => this.onManuallyEnterBookPress()}
        >
            <MaterialCommunityIcons name="barcode-scan" size={23} style={{ color: "#fff" }}/>
        </ActionButton>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderBottomNavigation()}
        {this.renderActionButton()}
      </View>
    );
  }
}
