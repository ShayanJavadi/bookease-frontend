import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  closeIconWrapperStyle: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  closeIconStyle: {
    color: "#aaa",
  },
  successIconWrapperStyle: {
    borderWidth: 4,
    borderColor: primaryColor,
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,

  },
  successIconStyle: {
    color: primaryColor,
  },
  successMessageWrapperStyle: {
    marginTop: 10,
  },
  successMessageHeaderStyle: {
    fontSize: 35,
    fontWeight: "600",
    textAlign: "center",
  },
  successMessageTextStyle: {
    fontSize: 20,
    fontWeight: "100",
    marginTop: 5,
  },
  buttonsWrapperStyle: {
    marginTop: 20,
  },
  primaryButtonContainerStyle: {
    height: 50,
    width: SCREEN_WIDTH - 50,
  },
  primaryButtonTextStyle: {
    fontSize: 21,
  },
  secondaryButtonContainerStyle: {
    height: 50,
    width: SCREEN_WIDTH - 50,
    marginTop: 13,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  secondaryButtonTextStyle: {
    fontSize: 21,
  },
});
