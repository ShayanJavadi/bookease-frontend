import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
export const styles = StyleSheet.create({
  pictureInputErrorMessageStyle: {
    color: "#d50000",
    paddingLeft: 20,
    paddingTop: 5,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  pictureInputHeaderTextStyle: {
    color: "#888",
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  pictureInputActionButtonStyle: {
     right: -10,
     bottom: -35,
     position: "absolute",
     zIndex: 9999
  },
  pictureInputHeaderTextStyleHasErrors: {
    color: "#d50000",
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  pictureInputHorizontalRuleStyle: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    zIndex: 1
  },
  pictureInputHorizontalRuleStyleHasErrors: {
    borderBottomColor: "#d50000",
    borderBottomWidth: 2,
    zIndex: 1
  },
});
