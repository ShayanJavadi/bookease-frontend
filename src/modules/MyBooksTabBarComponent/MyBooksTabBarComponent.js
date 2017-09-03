import React, { Component } from 'react';
import MaterialTabs from 'react-native-material-tabs'

export default class MyBooksTabBarComponent extends Component {
  state = {
   selectedTab: 0
  }

  onListingsPress = () => {
    this.props.navigation.navigate('myBooksListings');
  }

  onOrdersPress = () => {
    this.props.navigation.navigate('myBooksOrders');
  }

  onBookmarksPress = () => {
    this.props.navigation.navigate('myBooksBookmarks');
  }

  setTab = (tabIndex) => {
    this.setState({selectedTab: tabIndex})
  }

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
      <MaterialTabs
        items={['Listings', 'Orders', 'Bookmarks']}
        selectedIndex={this.state.selectedTab}
        onChange={(tabIndex) => this.setTab(tabIndex)}
        barColor="#1fbcd2"
        indicatorColor="#fffe94"
        activeTextColor="white"
      />
    );
  }
}
