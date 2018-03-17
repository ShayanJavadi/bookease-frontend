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

const renderIcons = (buyRequestNotifications, onLeftIconPress, onRightIconPress) => {
  return (
    <View style={listingFooterWrapperStyle}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start" }]}
          onPress={onLeftIconPress}
        >
          <MaterialCommunityIcons name="tag" size={21} style={listingFooterIconStyle} />
          <Text style={listingFooterTextStyle}>{buyRequestNotifications ? buyRequestNotifications.length : 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[listingFooterSectionWrapperStyle, { justifyContent: "flex-start" }]}
          onPress={onRightIconPress}
        >
          <MaterialCommunityIcons name="message" size={21} style={listingFooterIconStyle} />
          <Text style={listingFooterTextStyle}>0</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 }} />
    </View>
  )
}

const BookDetails = ({ textbook, onLeftIconPress, onRightIconPress  }) => {
  const { title, condition, authors, industryIdentifiers, edition, description, buyRequestNotifications } = textbook;

  return (
    <View style={bookDetailsWrapperStyle}>
      <View style={{ flex: 2 }}>
        {renderIcons(buyRequestNotifications, onLeftIconPress, onRightIconPress)}
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
          <View style={{ flexDirection: "row"  }}>
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
  onRightIconPress: func.isRequired,
};

export default BookDetails;
