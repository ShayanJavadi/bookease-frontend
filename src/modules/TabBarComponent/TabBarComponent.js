import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ActionButton from "react-native-action-button";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import { styles, ICON_SIZE, PLUS_ICON_SIZE, BOTTOM_NAVIGATION_ICON_SIZE } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {
  sellBooksButtonStyle,
  sellBooksButtonIconStyle,
  bottomNavigationStyle,
 } = styles;

export default class TabBarComponent extends Component {
  state = {
    selectedTab: 0
  }

  onHomePress = () => {
    this.props.navigation.navigate('home');
  }

  onMyBooksPress = () => {
    this.props.navigation.navigate('myBooks');
  }

  onSellBooksPress = () => {
    this.props.navigation.navigate('sellBooks');
  }

  onNotificationsPress = () => {
    this.props.navigation.navigate('notifications');
  }

  onAccountPress = () => {
    this.props.navigation.navigate('account');
  }

  setTab = (tabIndex) => {
    this.setState({selectedTab: tabIndex})
  }

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
          barBackgroundColor="#37474F"
          label="Home"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="home" />}
        />
        <Tab
          barBackgroundColor="#00796B"
          label="My Books"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="book-open-variant" />}
        />
        <Tab
          barBackgroundColor="#5D4037"
          label="Notifications"
          icon={<MaterialIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="mail" />}
        />
        <Tab
          barBackgroundColor="#3E2723"
          label="Account"
          icon={<MaterialCommunityIcons size={BOTTOM_NAVIGATION_ICON_SIZE} color="white" name="account" />}
        />
      </BottomNavigation>
    )
  }

  renderActionButton() {
    const { Item } = ActionButton;
    return (
      <View style={sellBooksButtonStyle}>
        <ActionButton
          buttonColor="#EB2A5D"
          position="right"
        >
          <Item
            buttonColor='#ff9900'
            title="Manually Enter Book"
            style={{ height: 2}}
          >
            <MaterialIcons name="edit" size={23} style={{ color: "#fff" }}/>
          </Item>
          <Item
            buttonColor='#A100FF'
            title="Scan Book"
          >
            <MaterialCommunityIcons name="barcode-scan" size={23} style={{ color: "#fff"}}/>
          </Item>
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
