import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { bool, string, func, object } from "prop-types";
import uiTheme from "src/common/styles/uiTheme";

const PhoneNumberContainer = ({ showPhoneNumber, text, phoneNumber, onPhoneNumberPress, styles = {}, showIcon = true }) => {
  const { phoneNumberWrapperStyle, phoneNumberDetailsWrapperStyle } = interalStyles;
  const { outerContainerStyles, innerContainerStyles } = styles;
  const { palette } = uiTheme;

  return (
    <View style={[phoneNumberWrapperStyle, outerContainerStyles]}>
      <View style={[phoneNumberDetailsWrapperStyle, innerContainerStyles]}>
        {showIcon ? <MaterialIcons style={{ color: "#ccc" }} name={showPhoneNumber ? "sms" : "lock"} size={50} /> : null}
        <Text
          style={{ fontSize: showPhoneNumber ? 23 : 30, paddingBottom: 10, paddingTop: showPhoneNumber ? 7 : 0, color: palette.primaryColor  }}
          onPress={onPhoneNumberPress}
        >
          {showPhoneNumber ? phoneNumber : "(•••) •••-••••"}
        </Text>
        <Text style={{ color: "#555", textAlign: "center", textAlignVertical: "center" }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

PhoneNumberContainer.propTypes = {
  showPhoneNumber: bool.isRequired,
  showIcon: bool.isRequired,
  text: string,
  phoneNumber: string,
  onPhoneNumberPress: func.isRequired,
  styles: object
};

const interalStyles = StyleSheet.create({
  phoneNumberWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  phoneNumberDetailsWrapperStyle: {
    paddingBottom: 70,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }
});


export default PhoneNumberContainer;
