import React, { Component } from "react";
import { View } from "react-native";
import { func, shape } from "prop-types";
import { NOTIFICATION_CONDITIONS } from "src/common/consts";
import SingleBuyRequest from "./SingleBuyRequest";
import { styles } from "./styles";

const {
  screenStyle,
} = styles;

export default class SingleNotificationScreen extends Component {
  static propTypes = {
    getNotificationQuery: func.isRequired,
    updateNotificationMutation: func.isRequired,
    updateBuyRequestMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  state = {
    notificationType: this.props.navigation.state.params ?
    this.props.navigation.state.params.notificationType :
    undefined,

    notificationId: this.props.navigation.state.params ?
    this.props.navigation.state.params.notificationId :
    undefined,
  }

  componentDidMount() {
    const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;
    const { getNotificationQuery } = this.props;
    const { notificationType, notificationId } = this.state;

    if (notificationType === BUY_REQUEST) {
      getNotificationQuery.refetch({
        id: notificationId
      })
    }
  }

  renderNotificationDetails() {
    const { getNotificationQuery, navigation, updateBuyRequestMutation } = this.props;

    return (
      <SingleBuyRequest
        notification={getNotificationQuery.getNotification}
        navigation={navigation}
        isLoading={getNotificationQuery.loading}
        updateBuyRequest={updateBuyRequestMutation}
      />
    )
  }

  render() {
    return (
      <View style={screenStyle}>
       {this.renderNotificationDetails()}
      </View>
    );
  }
}
