import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native";
import { func, object } from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { omit } from "lodash";
import Swipeable from "react-native-swipeable";
import { styles, SWIPE_OUT_ICON_SIZE, BUY_REQUEST_ICON_SIZE } from "./styles";
import { getRelativeTime } from "src/common/lib";

const {
  notificationWrapperStyle,
  swipeOutTextStyle,
  swipeOutStyle,
  notificationUpperWrapperStyle,
  notificationLowerWrapperStyle,
  notificationHeaderWrapperStyle,
  notificationHeaderIconStyle,
  notificationHeaderDateStyle,
  notificationHeaderTypeStyle,
  notificationDetailsWrapperStyle,
  notificatDetailsHeaderStyle,
  notificatDetailsTextbookStyle,
  notificatDetailsMessageStyle,
  notificationAvatarWrapperStyle,
  notificationAvatarStyle,
  notificationAvatarArrowIconWrapperStyle,
  notificationAvatarArrowIconStyle,
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
  const readNotification = Object.assign({}, omit(notification, ["buyRequest", "__typename", "createdAt"]), { isRead: true });

  return updateNotification({
    variables: {
      notification: readNotification,
    }
  })
  .then(() => {
    return navigation.navigate("singleNotificationScreen");
  })
}

const renderNotificationHeader = (createdAt) => {
  return (
    <View style={notificationHeaderWrapperStyle}>
      <MaterialCommunityIcons
        name="message-text"
        size={20}
        style={notificationHeaderIconStyle}
      />
      <Text style={notificationHeaderTypeStyle}>
        Buy Request <Text style={notificationHeaderDateStyle}>{`∙ ${getRelativeTime(createdAt, true)}`}</Text>
      </Text>
    </View>
  )
}

const renderNotificationDetails = (notification ,navigation) => {
  const { buyRequest: { message, textbookTitle, textbookId } } = notification;

  return (
    <View style={notificationDetailsWrapperStyle}>
      <Text style={notificatDetailsHeaderStyle}>
        Mike Johnson requested to purchase
      </Text>
      <Text style={notificatDetailsTextbookStyle} onPress={() => navigation.navigate("singleBook", { textbookId: textbookId })}>
        {textbookTitle}
      </Text>
      <Text style={notificatDetailsMessageStyle}>
        {message}
      </Text>
    </View>
  )
}

const renderNotificationAvatar = () => {
  return (
    <View style={notificationAvatarWrapperStyle}>
      <Image
        style={notificationAvatarStyle}
        source={{ uri: "https://media.licdn.com/media/AAEAAQAAAAAAAAR6AAAAJDVjYjI4MDFlLTBkNDAtNDE1Ny04NjYyLWViOWU3YzljNGNhZQ.jpg" }}
      />
      <View style={notificationAvatarArrowIconWrapperStyle}>
        <MaterialCommunityIcons
          name="reply"
          size={BUY_REQUEST_ICON_SIZE}
          style={notificationAvatarArrowIconStyle}
        />
      </View>
    </View>
  )
}

const BuyRequestNotificationCard = ({ notification, navigation, updateNotification }) => {
  return (
    <Swipeable
      rightButtons={renderSwipeOptions()}
    >
      <TouchableWithoutFeedback onPress={() => onBuyRequestPress(notification, navigation, updateNotification)}>
        <View style={[notificationWrapperStyle, { opacity: notification.isRead ? 0.5 : 1 }]}>
          <View style={notificationUpperWrapperStyle}>
            {renderNotificationHeader(notification.createdAt)}
            {renderNotificationDetails(notification, navigation)}
          </View>
          <View style={notificationLowerWrapperStyle}>
            {renderNotificationAvatar()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

BuyRequestNotificationCard.propTypes = {
  notification: object.isRequired,
  navigation: object.isRequired,
  updateNotification: func.isRequired,
}

export default BuyRequestNotificationCard;
