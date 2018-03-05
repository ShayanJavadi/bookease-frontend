import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { func, shape, bool } from "prop-types";
import { isEmpty } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles, palette } from "./styles";
import Header from "src/modules/Header";
import { NOTIFICATION_CONDITIONS } from "src/common/consts";
import BuyRequestNotificationCard from "./BuyRequestNotificationCard";

const {
  tertiaryColorDark,
} = palette;


const {
  screenStyle,
  noNotificationWrapperStyle,
  noNotificationIconWrapperStyle,
  noNotificationTextStyle,
  notificationsWrapperStyle,
  activityIndicatorWrapper,
} = styles;

export default class NotificationScreen extends Component {
  static propTypes = {
    getMyNotificationsQuery: func.isRequired,
    updateNotificationMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
    }).isRequired,
    isFocused: bool.isRequired,
  };

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  state = {
    refreshing: false,
    loading: false,
  }
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused && !this.props.isFocused) {
      this.setState({ loading: true })
      this.props.getMyNotificationsQuery.refetch()
      .then(() => {
        this.setState({ loading: false })
      });
    }
  }

  onScrollViewRefresh() {
    this.setState({ refreshing: true });
    this.props.getMyNotificationsQuery.refetch()
    .then(() => {
      this.setState({ refreshing: false });
    })
  }

  renderHeader() {
    return (
      <Header
        text="Notifications"
      />
    )
  }

  renderNotifications() {
    const { getMyNotificationsQuery: { getMyNotifications, loading } } = this.props;

    if (loading || this.state.loading) {
      return (
        <View style={activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )
    }

    if (isEmpty(getMyNotifications)) {
      return (
        this.renderNoNotifications()
      )
    }

    return (
      this.renderNotificationFlatList()
    )
  }

  renderNotificationFlatList() {
    const { getMyNotificationsQuery: { getMyNotifications } } = this.props;

    return (
      <View style={notificationsWrapperStyle}>
        <FlatList
          contentContainerStyle={{ borderBottomWidth: 0 }}
          data={getMyNotifications}
          renderItem={({ item }) => this.renderMyNotification(item)}
          keyExtractor={getMyNotifications => getMyNotifications.id}
        />
      </View>
    )
  }

  renderMyNotification(notification) {
    const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;
    const { updateNotificationMutation, navigation } = this.props;

    if (notification.type === BUY_REQUEST) {
      return (
        <BuyRequestNotificationCard
          notification={notification}
          navigation={navigation}
          updateNotification={updateNotificationMutation}
        />
      );
    }
  }

  renderNoNotifications() {
    return (
      <View style={noNotificationWrapperStyle}>
        <View style={noNotificationIconWrapperStyle}>
          <MaterialCommunityIcons
            name="email-outline"
            size={50}
            color="#666"
          />
        </View>
        <View>
          <Text style={noNotificationTextStyle}>{"Your notifications will appear here"}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={screenStyle}>
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onScrollViewRefresh()}
              tintColor={tertiaryColorDark}
            />
          }
        >
          {this.renderNotifications()}
        </ ScrollView>
      </View>
    );
  }
}
