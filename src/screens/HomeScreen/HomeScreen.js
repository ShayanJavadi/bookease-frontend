import React, { Component } from "react";
import { View } from "react-native";
import { Permissions, Notifications } from "expo";
import { object, func } from "prop-types";
import { styles } from "./styles";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import handleIOSPushNotifications from "src/common/lib/handleIOSPushNotification";

const { screenStyle } = styles;

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: object.isRequired,
    getTextbooksQuery: func.isRequired,
    updateSessionPushNotificationTokenMutation: func.isRequired,
    getStoredSessionUserInformation: func.isRequired,
    currentStoredUser: object.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  async handlePushNotificationToken() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    this.notificationSubscription = Notifications.addListener((notification) => handleIOSPushNotifications(notification, this.props.navigation));

    this.props.updateSessionPushNotificationTokenMutation({
      variables: {
        token: token
      }
    })
  }



  componentDidMount() {
    this.handlePushNotificationToken();
  }

  render() {
    const { getTextbooksQuery: { refetch, loading, getTextbooks }, navigation, currentStoredUser } = this.props;

    return (
        <View style={screenStyle}>
          <SearchForm
            searchTextbooks={refetch}
            resultsCount={getTextbooks ? getTextbooks.length : 0}
            navigation={navigation}
            currentStoredUser={currentStoredUser}
          />
          <SearchResults
            loading={loading}
            navigation={navigation}
            textbooks={getTextbooks}
          />
        </View>
    )
  }
}
