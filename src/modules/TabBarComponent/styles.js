import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export const BOTTOM_NAVIGATION_ICON_SIZE = 24;
export const ACTION_BUTTON_COLOR = primaryColor;
export const TAB_COLOR = tertiaryColorDark;

export const styles = StyleSheet.create({
  sellBooksButtonStyle: {
    bottom: 150,
    left: 20,
    zIndex: 10,
  },
  sellBooksButtonIconStyle: {
    fontWeight: "700",
    color: "#fff",
    zIndex: 10,
  },
  bottomNavigationStyle: {
    height: 56,
    elevation: 8,
    position: "relative",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  ActionButtonFontStyle: {
    color: "#fff",
    position: "relative",
    bottom: 3,
    fontWeight: "700",
    fontSize: 11,
    paddingLeft: 1,
    zIndex: 10,
  }
});
