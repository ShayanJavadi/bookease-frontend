import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
  primaryColorLight,
} = palette;

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  screenStyleWithKeyboard: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenStyleWithoutKeyboard : {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContainerStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: 29,
    fontWeight: "100",
    paddingTop: 70,
    paddingBottom: 40,
  },
  privacyNoticeTextStyle: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    paddingLeft: 10,
    paddingBottom: 40,
    paddingRight: 10,
  },
  inputContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    height: 50,
    width: SCREEN_WIDTH * 0.9,
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 24,
    backgroundColor: "#fff",
    color: "#424242",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    marginTop: 100,
    marginBottom: 40,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  disabledButtonContainerStyle: {
    backgroundColor: primaryColorLight,
    marginTop: 100,
    marginBottom: 40,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  activitySpinnerStyle: {
    marginTop: 100,
    marginBottom: 40,
    height: 80,
  },
  closeIconWrapperStyle: {
    position: "absolute",
    top: 30,
    right: 15,
  },
  closeIconStyle: {
    color: "#aaa",
  },
  lockIconStyle: {
    color: "#000",
  },
});
