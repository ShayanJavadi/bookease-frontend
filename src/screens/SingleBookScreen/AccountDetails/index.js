import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { styles } from "./styles";

const {
  accountDetailsWrapperStyle,
  accountDetailsNameStyle,
  accountDetailsPostedStyle,
  bookDetailsLowerSectionWrapper,
  bookDescriptionWrapperStyle,
  bookDescriptionStyle,
} = styles;

const AccountDetails = ({ textbook: { owner, description } }) => (
  <TouchableWithoutFeedback onPress={() => alert("go to account page ")}>
    <View style={bookDetailsLowerSectionWrapper}>
      <View style={accountDetailsWrapperStyle}>
        <View style={{ flex: 1 }}>
          <MaterialIcons name="account-circle" size={75} style={{ color: "#ccc" }} />
        </View>
        <View style={{ flex: 3, paddingBottom: 3 }}>
          <Text style={accountDetailsNameStyle}>{owner}</Text>
          <Text style={accountDetailsPostedStyle}>Posted 3 hours ago</Text>
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
