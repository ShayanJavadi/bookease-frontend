import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export const ICON_SIZE = 20;

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: tertiaryColorDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    width: SCREEN_WIDTH,
    height: 70,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    top: 35
  },
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  inputGroupStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButtonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  signOutButtonContainerStyle: {
    backgroundColor: primaryColor,
    marginTop: 100,
    marginBottom: 40,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  editButtonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  editButtonContainerStyle: {
    backgroundColor: primaryColor,
    height: 35,
    width: SCREEN_WIDTH * 0.2,
  },
  editButtonIconStyle: {
    color: "#fff",
  },
  inputStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    width: SCREEN_WIDTH * 0.7,
  },

});
