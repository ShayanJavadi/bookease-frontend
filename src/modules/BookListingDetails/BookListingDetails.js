/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { isEmpty } from "lodash";
import { object, func, bool, shape } from "prop-types";
import { styles } from "./styles";
import { toOrdinal, getRelativeTime } from "src/common/lib";
import Chip from "src/modules/Chip";
import { NOTIFICATION_CONDITIONS } from "src/common/consts";
import Avatar from "src/modules/Avatar";

const {
  listingPictureWrapperStyle,
  listingPictureStyle,
  listingFooterWrapperStyle,
  listingFooterSectionWrapperStyle,
  listingFooterIconStyle,
  listingFooterTextStyle,
  listingDetailsWrapperStyle,
  listingNameWrapperStyle,
  listingNameTextStyle,
  listingDetailWrapperStyle,
  listingSmallDetailsTextStyle,
  listingWrapperStyle,
  archiveIconStyle,
  listingBuyRequestIconStyle,
  acceptedBuyRequestWrapperStyle,
  acceptedBuyRequestTextStyle,
  acceptedBuyRequestSection,
  buyRequestOuterWrapperStyle,
  buyRequestInnerWrapperStyle,
  buyRequestTextStyle,
} = styles;

const renderListingImage = ({ price, images }) => {
  return (
    <View style={listingPictureWrapperStyle}>
      <Image
        style={listingPictureStyle}
        source={{ uri: images[0].thumbnail }}
      />
      <Chip
        text={`\$${price}`}
      />
    </View>
  )
}

const renderBookTitle = ({ title, edition, createdAt, isArchived }) => {
  return (
    <View style={listingNameWrapperStyle}>
      <View style={{ flex: 7 }}>
        <Text style={listingNameTextStyle}>{title}({toOrdinal(edition)})
          <Text style={{ color: "#999", fontSize: 14 }}>{`∙ ${getRelativeTime(createdAt)}`}</Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          isArchived ?
          <MaterialCommunityIcons name="archive" size={21} style={archiveIconStyle} /> :
          null
        }
      </View>
    </View>
  )
}

const renderBookStatus = (listing) => { // eslint-disable-line no-unused-vars
  return (
    <View style={listingDetailWrapperStyle}>
      <Text style={listingSmallDetailsTextStyle}>
        <Text style={{ fontWeight: "400" }}>Status:</Text> active
      </Text>
    </View>
  )
}

const renderListingDetails = (listing) => {
  const {
    authors,
    industryIdentifiers,
  } = listing;

  return (
    <View style={listingDetailsWrapperStyle}>
      {renderBookTitle(listing)}
      <View style={listingDetailWrapperStyle}>
        <Text style={listingSmallDetailsTextStyle}>
          <Text style={{ fontWeight: "400" }}>Author:</Text> {authors}
        </Text>
      </View>
      <View style={listingDetailWrapperStyle}>
        <Text style={listingSmallDetailsTextStyle}>
          <Text style={{ fontWeight: "400" }}>ISBN:</Text> {industryIdentifiers[0].identifier}
        </Text>
      </View>
      {renderBookStatus(listing)}
    </View>
  )
}

const renderListingFooter = ({ listing, showFavoriteIcon, showQuestionsIcon }) => {// eslint-disable-line no-unused-vars
  return (
    <View style={listingFooterWrapperStyle}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        {
          showFavoriteIcon &&
          <View style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-end" }]}>
            <MaterialCommunityIcons name="heart" size={15} style={listingFooterIconStyle} />
            <Text style={listingFooterTextStyle}>0</Text>
          </View>
        }
        {
          showQuestionsIcon &&
          <View style={[listingFooterSectionWrapperStyle, {
            justifyContent: !showFavoriteIcon ? "flex-end" : "center",
            paddingRight: !showFavoriteIcon ? 19 : 0
          }]}>
            <MaterialCommunityIcons name="message" size={15} style={listingFooterIconStyle} />
            <Text style={listingFooterTextStyle}>0</Text>
          </View>
        }
      </View>
    </View>
  )
}

const renderAcceptedBuyRequests = ({ buyRequests, navigation }) => {
  const { BUY_REQUEST } = NOTIFICATION_CONDITIONS;

  if (!isEmpty(buyRequests)) {
    return buyRequests.map((buyRequest) => {
      const { user: { displayName, photoURL }, id } = buyRequest;
      if (!buyRequest.buyRequest.isAccepted) {
        return;
      }

      return (
        <TouchableOpacity
          key={id}
          style={acceptedBuyRequestWrapperStyle}
          onPress={() => navigation.navigate("singleNotificationScreen", { notificationType: BUY_REQUEST, notificationId: id })}
        >
          <View style={[ acceptedBuyRequestSection, { flex: 8 } ]}>
            <MaterialIcons name="people" size={15} style={listingBuyRequestIconStyle} />
            <Text numberOfLines={1} style={acceptedBuyRequestTextStyle}>Arrange a meetup with {`${displayName}`}</Text>
          </View>
          <View style={[ acceptedBuyRequestSection, { flex: 1, paddingLeft: 15 } ]}>
            <Avatar
              size={25}
              uri={photoURL}
            />
          </View>
        </TouchableOpacity>
      )
    })
  }
}

const renderBuyRequests = (buyRequests) => {
  if (!isEmpty(buyRequests)) {
    const buyRequestCount = buyRequests.length;
    const hasMultipleBuyRequests = buyRequestCount > 1;
    const tagIcon = hasMultipleBuyRequests ? "tag-multiple" : "tag";
    const tagIconSize = hasMultipleBuyRequests ? 18 : 15;

    return (
      <View style={buyRequestOuterWrapperStyle}>
        <View style={buyRequestInnerWrapperStyle}>
          <MaterialCommunityIcons name={tagIcon} size={tagIconSize} style={listingBuyRequestIconStyle} />
          <Text style={buyRequestTextStyle}>x {`${buyRequests.length}`} Buy Requests</Text>
          {
            buyRequests.map((buyRequest, index) => (
              <Avatar
                key={buyRequest.id}
                size={25}
                styles={{
                  position: "absolute",
                  zIndex: 9999 - index,
                  left: `${60 + index * 4}%`
                }}
                uri={buyRequest.user.photoURL}
              />
            ))
          }
        </View>
      </View>
    )
  }
}

const BookListingDetails = ({
  listing,
  onPress,
  buyRequests,
  showFavoriteIcon = true,
  showQuestionsIcon = true,
  navigation,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={listingWrapperStyle}>
        <View style={{ flexDirection: "row" }}>
          {renderListingImage(listing)}
          {renderListingDetails(listing)}
        </View>
        {renderListingFooter({ listing, showFavoriteIcon, showQuestionsIcon })}
        {renderBuyRequests(buyRequests)}
        {renderAcceptedBuyRequests({ buyRequests, navigation })}
      </View>
    </TouchableWithoutFeedback>
  );
};

BookListingDetails.propTypes = {
  listing: object.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  onPress: func,
  showFavoriteIcon: bool,
  showQuestionsIcon: bool,
};


export default BookListingDetails;
/* eslint-enable react/prop-types */
