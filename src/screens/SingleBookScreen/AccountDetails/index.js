import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { getRelativeTime } from "src/common/lib";
import { styles } from "./styles";
import Avatar from "src/modules/Avatar";

const {
  accountDetailsWrapperStyle,
  accountDetailsNameStyle,
  accountDetailsPostedStyle,
  bookDetailsLowerSectionWrapper,
} = styles;

const AccountDetails = ({ textbook: { createdAt, user: { displayName, photoURL } } }) => (
  <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
    <View style={bookDetailsLowerSectionWrapper}>
      <View style={accountDetailsWrapperStyle}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Avatar
            size={60}
            uri={photoURL}
            styles={{ backgroundColor: "#f1f1f1" }}
          />
        </View>
        <View style={{ flex: 3, paddingBottom: 3 }}>
          <Text style={accountDetailsNameStyle}>{displayName}</Text>
          <Text style={accountDetailsPostedStyle}>Posted {getRelativeTime(createdAt, true)}</Text>
        </View>
        <View style={{ flex: .5 }}>
          <MaterialIcons name="navigate-next" size={30} style={{ color: "#ccc" }} />
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

AccountDetails.propTypes = {
  textbook: object.isRequired,
};

export default AccountDetails;
