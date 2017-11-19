import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { getRelativeTime } from "src/common/lib";
import { styles } from "./styles";

const {
  accountDetailsWrapperStyle,
  accountDetailsNameStyle,
  accountDetailsPostedStyle,
  bookDetailsLowerSectionWrapper,
  bookDescriptionWrapperStyle,
  bookDescriptionStyle,
} = styles;

const AccountDetails = ({ textbook: { description, createdAt } }) => (
  <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
    <View style={bookDetailsLowerSectionWrapper}>
      <View style={accountDetailsWrapperStyle}>
        <View style={{ flex: 1 }}>
          <MaterialIcons name="account-circle" size={75} style={{ color: "#ccc" }} />
        </View>
        <View style={{ flex: 3, paddingBottom: 3 }}>
          {  // TODO: Hook up owner name with api
          }
          <Text style={accountDetailsNameStyle}>John Doe</Text>
          <Text style={accountDetailsPostedStyle}>Posted {getRelativeTime(createdAt, true)}</Text>
        </View>
        <View style={{ flex: .5 }}>
          <MaterialIcons name="navigate-next" size={30} style={{ color: "#ccc" }} />
        </View>
      </View>
      <View style={bookDescriptionWrapperStyle}>
        <Text style={bookDescriptionStyle}>{description}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

AccountDetails.propTypes = {
  textbook: object.isRequired,
};

export default AccountDetails;
