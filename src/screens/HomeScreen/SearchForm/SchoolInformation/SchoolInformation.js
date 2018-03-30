import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { object } from "prop-types";
import { styles } from "./styles";

const {
  schoolInformationWrapperStyle,
  schoolNameTextStyle,
} = styles;

const SchoolInformation = ({ currentStoredUser }) => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <View style={{ flex: 2 }}>
      <TouchableOpacity style={schoolInformationWrapperStyle}>
        <MaterialIcons name="location-on" size={15} style={{  color: "#ddd" }} />
        <Text style={schoolNameTextStyle}>{
          currentStoredUser ?
          currentStoredUser.schoolName :
          "Press here to select your school."
        }</Text>
      </TouchableOpacity>
    </View>
    <View style={{ flex: 1 }} />
  </View>
)

SchoolInformation.propTypes = {
  currentStoredUser: object,
}

export default SchoolInformation;
