import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { func, object, bool, number } from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles, BUY_REQUEST_ICON_SIZE } from "./styles";
import { getRelativeTime } from "src/common/lib";

const {
  notificationWrapperStyle,
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
  expandedNotificationUpperWrapperStyle,
  expandedNotificationLowerWrapperStyle,
  expandedNotificationAvatarWrapperStyle,
  expandedNotificationAvatarStyle,
} = styles;

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

const renderNotificationDetails = (notification ,navigation, numberOfMessageLines) => {
  const { buyRequest: { message, textbook, textbookId } } = notification;

  return (
    <View style={notificationDetailsWrapperStyle}>
      <Text style={notificatDetailsHeaderStyle}>
        Mike Johnson requested to purchase
      </Text>
      <Text style={notificatDetailsTextbookStyle} onPress={() => navigation.navigate("singleBook", { textbookId: textbookId })}>
        {textbook.title} - ${textbook.price}
      </Text>
      <Text style={notificatDetailsMessageStyle} numberOfLines={numberOfMessageLines}>
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

const renderExpandedNotifcationAvatar = () => {
  return (
    <View style={expandedNotificationAvatarWrapperStyle}>
      <Image
        style={expandedNotificationAvatarStyle}
        source={{ uri: "https://media.licdn.com/media/AAEAAQAAAAAAAAR6AAAAJDVjYjI4MDFlLTBkNDAtNDE1Ny04NjYyLWViOWU3YzljNGNhZQ.jpg" }}
      />
    </View>
  )
}

const renderExpandedBuyRequest = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead) => {
  return (
    <View style={[notificationWrapperStyle, { opacity: notification.isRead && shouldLowerOpacityOnRead ? 0.5 : 1, flexDirection: "column" }]}>
      <View style={expandedNotificationUpperWrapperStyle}>
        {renderExpandedNotifcationAvatar()}
      </View>
      <View style={expandedNotificationLowerWrapperStyle}>
        {renderNotificationHeader(notification.createdAt)}
        {renderNotificationDetails(notification, navigation, numberOfMessageLines)}
      </View>
    </View>
  )
}

const renderCompressedBuyRequest = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead) => {
  return (
    <View style={[notificationWrapperStyle, { opacity: notification.isRead && shouldLowerOpacityOnRead ? 0.5 : 1 }]}>
      <View style={notificationUpperWrapperStyle}>
        {renderNotificationHeader(notification.createdAt)}
        {renderNotificationDetails(notification, navigation, numberOfMessageLines)}
      </View>
      <View style={notificationLowerWrapperStyle}>
        {renderNotificationAvatar()}
      </View>
    </View>
  )
}

const renderBuyRequestContents = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isExpanded) => {
  if (isExpanded) {
    return renderExpandedBuyRequest(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead);
  }

  return renderCompressedBuyRequest(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead);
}

const BuyRequestDetails = ({ notification, navigation, onPress, shouldLowerOpacityOnRead, numberOfMessageLines, isExpanded }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        {renderBuyRequestContents(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isExpanded)}
    </TouchableWithoutFeedback>
  );
};

BuyRequestDetails.propTypes = {
  notification: object.isRequired,
  navigation: object.isRequired,
  isExpanded: bool,
  onPress: func,
  shouldLowerOpacityOnRead: bool,
  numberOfMessageLines: number
};


export default BuyRequestDetails;
