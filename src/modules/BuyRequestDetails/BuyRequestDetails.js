import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { func, object, bool, number } from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles, BUY_REQUEST_ICON_SIZE, READ_OPACITY } from "./styles";
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
  compactNotificationWrapperStyle,
  notificationAvatarContentsWrapperStyle,
} = styles;

const renderNotificationHeader = (createdAt) => {
  return (
    <View style={notificationHeaderWrapperStyle}>
      <MaterialCommunityIcons
        name="tag"
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
        {notification.user.displayName} requested to purchase
      </Text>
      <Text style={notificatDetailsTextbookStyle} onPress={() => navigation.navigate("singleBook", { textbookId: textbookId })}>
        {textbook.title}
      </Text>
      <Text style={notificatDetailsMessageStyle} numberOfLines={numberOfMessageLines}>
        {message}
      </Text>
    </View>
  )
}

const renderNotificationAvatar = (photoURL) => {
  return (
    <View style={notificationAvatarWrapperStyle}>
      <View style={notificationAvatarContentsWrapperStyle}>
        <Image
          style={notificationAvatarStyle}
          source={{ uri: photoURL }}
        />
        <View style={notificationAvatarArrowIconWrapperStyle}>
          <MaterialCommunityIcons
            name="reply"
            size={BUY_REQUEST_ICON_SIZE}
            style={notificationAvatarArrowIconStyle}
          />
        </View>
      </View>
    </View>
  )
}

const renderExpandedNotifcationAvatar = (photoURL) => {
  return (
    <View style={expandedNotificationAvatarWrapperStyle}>
      <Image
        style={expandedNotificationAvatarStyle}
        source={{ uri: photoURL }}
      />
    </View>
  )
}

const renderExpandedBuyRequest = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead) => {
  return (
    <View style={[notificationWrapperStyle, { opacity: notification.isRead && shouldLowerOpacityOnRead ? READ_OPACITY : 1, flexDirection: "column" }]}>
      <View style={expandedNotificationUpperWrapperStyle}>
        {renderExpandedNotifcationAvatar(notification.user.photoURL)}
      </View>
      <View style={expandedNotificationLowerWrapperStyle}>
        {renderNotificationHeader(notification.createdAt)}
        {renderNotificationDetails(notification, navigation, numberOfMessageLines)}
      </View>
    </View>
  )
}

const renderNormalBuyRequest = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead) => {
  return (
    <View style={[notificationWrapperStyle, { opacity: notification.isRead && shouldLowerOpacityOnRead ? READ_OPACITY : 1 }]}>
      <View style={notificationUpperWrapperStyle}>
        {renderNotificationHeader(notification.createdAt)}
        {renderNotificationDetails(notification, navigation, numberOfMessageLines)}
      </View>
      <View style={notificationLowerWrapperStyle}>
        {renderNotificationAvatar(notification.user.photoURL)}
      </View>
    </View>
  )
}

const renderCompactNotificationDetails = (notification ,navigation, numberOfMessageLines, isReversed) => { // eslint-disable-line no-unused-vars
  const { buyRequest: { textbook, textbookId } } = notification;
  return (
    <View style={notificationDetailsWrapperStyle}>
      <Text style={notificatDetailsHeaderStyle}>
        {notification.user.displayName} requested to purchase
      </Text>
      <Text style={notificatDetailsTextbookStyle} onPress={() => navigation.navigate("singleBook", { textbookId: textbookId })}>
        {textbook.title}
      </Text>
    </View>
  )
}

const renderCompactBuyRequest = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isReversed) => {
  const calculatedOpacity = notification.isRead && shouldLowerOpacityOnRead ? READ_OPACITY : 1;
  const calculatedFlexDirection = isReversed ? "row-reverse" : "row";
  const calculatedRequestDetailsPaddingLeft = isReversed ? 15 : undefined;

  return (
    <View style={[
      compactNotificationWrapperStyle,
      { opacity: calculatedOpacity, flexDirection: calculatedFlexDirection }
    ]}>
      <View style={[notificationUpperWrapperStyle, { paddingLeft: calculatedRequestDetailsPaddingLeft }]}>
        {renderNotificationHeader(notification.createdAt)}
        {renderCompactNotificationDetails(notification, navigation, numberOfMessageLines, isReversed)}
      </View>
      <View style={notificationLowerWrapperStyle}>
        {renderNotificationAvatar(notification.user.photoURL)}
      </View>
    </View>
  )
}

const renderBuyRequestContents = (notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isExpanded, isCompact, isReversed) => {
  if (isExpanded) {
    return renderExpandedBuyRequest(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead);
  }

  if (isCompact) {
    return renderCompactBuyRequest(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isReversed);
  }

  return renderNormalBuyRequest(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead);
}

const BuyRequestDetails = ({ notification, navigation, onPress, shouldLowerOpacityOnRead, numberOfMessageLines, isExpanded, isCompact, isReversed }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        {renderBuyRequestContents(notification, navigation, numberOfMessageLines, shouldLowerOpacityOnRead, isExpanded, isCompact, isReversed)}
    </TouchableWithoutFeedback>
  );
};

BuyRequestDetails.propTypes = {
  notification: object.isRequired,
  navigation: object.isRequired,
  isExpanded: bool,
  onPress: func,
  shouldLowerOpacityOnRead: bool,
  numberOfMessageLines: number,
  isCompact: bool,
  isReversed: bool,
};


export default BuyRequestDetails;
