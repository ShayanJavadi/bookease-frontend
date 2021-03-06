import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { object, func, bool } from "prop-types";
import { capitalize } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { toOrdinal, mapNumberToConditions } from "src/common/lib";
import { styles } from "./styles";

const {
  bookDetailsWrapperStyle,
  bookDetailsTitleWrapperStyle,
  bookDetailsTitleStyle,
  bookDetailsTextWrapperStyle,
  bookDetailsTextKeyStyle,
  bookDetailsTextValueStyle,
  listingFooterWrapperStyle,
  listingFooterSectionWrapperStyle,
  listingFooterIconStyle,
  listingFooterTextStyle,
} = styles;

const renderBookmarkIcon = (isUserOwner, onLeftIconPress, isBookmarkedByCurrentUser, bookmarkCount) => {
  if (isUserOwner) {
    return (
      <View
        style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start" }]}
      >
        <MaterialCommunityIcons name="heart" size={21} style={isBookmarkedByCurrentUser ? listingFooterIconStyle : { color: "#ccc" }} />
        <Text style={listingFooterTextStyle}>{bookmarkCount}</Text>
      </View>

    )
  }

  return (
    <TouchableOpacity
      style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start" }]}
      onPress={onLeftIconPress}
    >
      <MaterialCommunityIcons name="heart" size={21} style={isBookmarkedByCurrentUser ? listingFooterIconStyle : { color: "#ccc" }} />
      <Text style={listingFooterTextStyle}>{bookmarkCount}</Text>
    </TouchableOpacity>

  )
}

const renderIcons = (buyRequestNotifications, onLeftIconPress, onMiddleIconPress, onRightIconPress, isUserOwner, isBookmarkedByCurrentUser, bookmarkCount) => {
  const buyRequestsCount = buyRequestNotifications.length;
  const hasMultipleBuyRequests = buyRequestsCount > 1;

  return (
    <View style={listingFooterWrapperStyle}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {renderBookmarkIcon(isUserOwner, onLeftIconPress, isBookmarkedByCurrentUser, bookmarkCount)}
        <TouchableOpacity
          style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start", marginRight: isUserOwner ? 0 : 30 }]}
          onPress={onMiddleIconPress}
        >
          <MaterialCommunityIcons name="message" size={21} style={listingFooterIconStyle} />
          <Text style={listingFooterTextStyle}>0</Text>
        </TouchableOpacity>
        {
          isUserOwner &&
          <TouchableOpacity
            style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start" }]}
            onPress={onRightIconPress}
          >
            <MaterialCommunityIcons name={hasMultipleBuyRequests ? "tag-multiple" : "tag"} size={hasMultipleBuyRequests ? 23 : 21} style={listingFooterIconStyle} />
            <Text style={listingFooterTextStyle}>{buyRequestNotifications ? buyRequestsCount : 0}</Text>
          </TouchableOpacity>
        }
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
        {
          isUserOwner &&
          <TouchableOpacity onPress={() => alert("archive")}>
            <MaterialCommunityIcons size={24} color="#ddd" name="archive" />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const BookDetails = ({ textbook, onLeftIconPress, onMiddleIconPress, onRightIconPress, isUserOwner }) => {
  const { 
    title,
    condition,
    authors,
    industryIdentifiers,
    edition,
    description,
    buyRequestNotifications,
    isBookmarkedByCurrentUser,
    bookmarkCount,
  } = textbook;

  return (
    <View style={bookDetailsWrapperStyle}>
      <View style={{ flex: 2 }}>
        {renderIcons(buyRequestNotifications, onLeftIconPress, onMiddleIconPress, onRightIconPress, isUserOwner, isBookmarkedByCurrentUser, bookmarkCount)}
        <View style={bookDetailsTitleWrapperStyle}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={bookDetailsTitleStyle}>{title}</Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={bookDetailsTextKeyStyle}>
              Condition: <Text style={bookDetailsTextValueStyle}>{capitalize(mapNumberToConditions(condition))}</Text>
            </Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>
              Author: <Text style={bookDetailsTextValueStyle}>{authors}</Text>
            </Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={bookDetailsTextKeyStyle}>
              Edition: <Text style={bookDetailsTextValueStyle}>{toOrdinal(edition)}</Text>
            </Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>
              ISBN: <Text style={bookDetailsTextValueStyle}>{industryIdentifiers[0].identifier}</Text>
            </Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>
              Description: <Text style={bookDetailsTextValueStyle}>{description}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
};

BookDetails.propTypes = {
  textbook: object.isRequired,
  isUserOwner: bool.isRequired,
  onLeftIconPress: func.isRequired,
  onMiddleIconPress: func.isRequired,
  onRightIconPress: func.isRequired,
};

export default BookDetails;
