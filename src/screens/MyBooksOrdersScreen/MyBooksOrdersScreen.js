import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { func, shape } from "prop-types";
import { isEmpty } from "lodash";
import { Button } from "react-native-material-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookListingDetails from "src/modules/BookListingDetails";
import { styles, NO_ORDERS_ICON_COLOR, palette } from "./styles";

const {
  tertiaryColorDark,
} = palette;


const {
  screenStyle,
  ordersWrapperStyle,
  noOrdersWrapperStyle,
  noOrdersIconWrapperStyle,
  noOrdersTextStyle,
  activityIndicatorWrapperStyle,
} = styles;

export default class MyBooksOrdersScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    getMyBuyRequestsQuery: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  state = {
    refreshing: false,
    isDeletingOrder: false,
    hasStaleData: true,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.navigation.isFocused()) {
      this.setState({ hasStaleData: true })
    }
    if (nextProps.navigation.isFocused() && this.state.hasStaleData) {
      this.props.getMyBuyRequestsQuery.refetch()
        .then(() => {
          this.setState({ hasStaleData: false });
        })
    }
  }

  onScrollViewRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getMyBuyRequestsQuery.refetch()
      .then(() => {
        this.setState({ refreshing: false });
      })
  }

  renderMyOrders({ textbook, isAccepted, id }) {
    const { navigation } = this.props;

    return (
      <BookListingDetails
        listing={textbook}
        onPress={() => navigation.navigate("singleBook", { textbookId: textbook.id })}
        navigation={navigation}
        showBuyRequestStatus
        myBuyRequest={{ id, user: textbook.user, isAccepted }}
      />
    );
  }

  renderOrders = () => {
    const { loading, getMyBuyRequests } = this.props.getMyBuyRequestsQuery;
    if (loading) {
      return (
        <View style={activityIndicatorWrapperStyle}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )
    }

    if (isEmpty(getMyBuyRequests)) {
      return (
        <View style={noOrdersWrapperStyle}>
          <View style={noOrdersIconWrapperStyle}>
            <MaterialCommunityIcons
              name="tag-faces"
              size={40}
              color={NO_ORDERS_ICON_COLOR}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={noOrdersTextStyle}>{"Your orders will appear here."}</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Button
              primary
              raised
              text="Search Books"
              onPress={() => this.props.navigation.navigate("home")}
            />
          </View>
        </View>
      )
    }

    return (
      <View style={ordersWrapperStyle}>
        <FlatList
          data={getMyBuyRequests}
          renderItem={({ item }) => this.renderMyOrders(item)}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  render() {
    // you haven't bookmarked anything
    // search books
    return (
      <View style={screenStyle}>
        <ScrollView style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onScrollViewRefresh}
              tintColor={tertiaryColorDark}
            />
          }
        >
          {this.renderOrders()}
        </ ScrollView>
      </View>
    );
  }
}
