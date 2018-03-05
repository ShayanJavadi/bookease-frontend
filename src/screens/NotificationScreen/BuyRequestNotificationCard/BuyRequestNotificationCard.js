import React from "react";
import { TouchableOpacity } from "react-native";
import { func, object } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { omit } from "lodash";
import Swipeable from "react-native-swipeable";
import { styles, SWIPE_OUT_ICON_SIZE } from "./styles";
import BuyRequestDetails from "src/modules/BuyRequestDetails";
import { NOTIFICATION_CONDITIONS } from "src/common/consts";

const {
  swipeOutTextStyle,
  swipeOutStyle,
} = styles;

const renderSwipeOptions = () => ([
  <TouchableOpacity
    style={[swipeOutStyle, { backgroundColor: "#00BFA5" }]}
    key="edit"
    onPress={() => alert("edit")}
  >
    <MaterialIcons
      name="edit"
      size={SWIPE_OUT_ICON_SIZE}
      style={swipeOutTextStyle}
    />
  </TouchableOpacity>,
  <TouchableOpacity
    style={[swipeOutStyle, { backgroundColor: "#ff003d" }]} key="delete"
    onPress={() => alert("delete")}
  >
    <MaterialCommunityIcons
      name="delete"
      size={SWIPE_OUT_ICON_SIZE}
      style={swipeOutTextStyle}
    />
  </TouchableOpacity>
])

const onBuyRequestPress = (notification, navigation, updateNotification) => {
  const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;
  const readNotification = Object.assign({}, omit(notification, ["buyRequest", "__typename", "createdAt"]), { isRead: true });

  return updateNotification({
    variables: {
      notification: readNotification,
    }
  })
  .then(() => {
    return navigation.navigate("singleNotificationScreen", { notificationType: BUY_REQUEST, notificationId: notification.id });
  })
}

const BuyRequestNotificationCard = ({ notification, navigation, updateNotification }) => {
  return (
    <Swipeable
      rightButtons={renderSwipeOptions()}
    >
      <BuyRequestDetails
        notification={notification}
        navigation={navigation}
        onPress={() =>  onBuyRequestPress(notification, navigation, updateNotification)}
        shouldLowerOpacityOnRead
        numberOfMessageLines={2}
      />
    </Swipeable>
  )
}

BuyRequestNotificationCard.propTypes = {
  notification: object.isRequired,
  navigation: object.isRequired,
  updateNotification: func.isRequired,
}

export default BuyRequestNotificationCard;
