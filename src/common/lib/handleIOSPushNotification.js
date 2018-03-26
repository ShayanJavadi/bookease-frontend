import { AlertIOS } from "react-native";
import { NavigationActions } from "react-navigation";
import NOTIFICATION_CONDITIONS from "src/common/consts/notificationConditions";

export default (notification, navigation) => {
  const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;
  const { data } = notification;

  if (data.notificationType === BUY_REQUEST) {
    const navigateToNotificationsAction = NavigationActions.reset({
      index: 1,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: "mainScreen",
          action: NavigationActions.navigate({ routeName: "notifications" })
        }),
        NavigationActions.navigate({
          routeName: "singleNotificationScreen",
          params: { notificationType: "BUY_REQUEST", notificationId: data.notificationId }
        })
      ]
    });

    if (notification.origin === "selected") {
      return navigation.dispatch(navigateToNotificationsAction);
    }

    return (
      AlertIOS.alert(
        data.title,
        data.body,
        [
          {
            text: "Cancel",
          },
          {
            text: "View",
            onPress: () => {
              navigation.dispatch(navigateToNotificationsAction);
            },
          },
        ]
      )
    )
  }
}
