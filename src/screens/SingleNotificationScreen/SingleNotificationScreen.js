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
    getNotification: func.isRequired,
    updateNotification: func.isRequired,
    updateBuyRequest: func.isRequired,
    createTextbookSale: func.isRequired,
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
    const { getNotification } = this.props;
    const { notificationType, notificationId } = this.state;

    if (notificationType === BUY_REQUEST) {
      getNotification.refetch({
        id: notificationId
      })
    }
  }

  renderNotificationDetails() {
    const { getNotification, navigation, updateBuyRequest, createTextbookSale } = this.props;
    return (
      <SingleBuyRequest
        notification={getNotification.getNotification}
        navigation={navigation}
        isLoading={getNotification.loading}
        updateBuyRequest={updateBuyRequest}
        createTextbookSale={createTextbookSale}
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
