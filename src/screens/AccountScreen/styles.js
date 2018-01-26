import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
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
});
