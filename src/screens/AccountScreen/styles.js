import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export const ICON_SIZE = 24;
export const AVATAR_SIZE = 150;

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
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  avatarActionButtonStyle: {
    right: -38,
    bottom: -30,
    position: "absolute",
    zIndex: 9999
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
    marginBottom: 20,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  editIconStyle: {
    color: tertiaryColorDark,
    paddingLeft: 10,
    paddingTop: 15,
  },
  inputStyle: {
    width: SCREEN_WIDTH * 0.75,
  },
  modalButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  modalButtonIconStyle: {
    color: "#fff",
    paddingTop: 2,
  },
  modalButtonWrapperStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 35,
  },
});
