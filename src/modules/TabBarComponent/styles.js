import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;

export const BOTTOM_NAVIGATION_ICON_SIZE = 24;
export const ACTION_BUTTON_COLOR = "#ff9900";
export const TAB_COLOR = tertiaryColorDark;

export const styles = StyleSheet.create({
  sellBooksButtonStyle: {
    zIndex: 9999,
    bottom: 150,
    left: 20,
  },
  sellBooksButtonIconStyle: {
    fontWeight: "700",
    color: "#fff",
  },
  bottomNavigationStyle: {
    height: 56,
    elevation: 8,
    position: "relative",
    left: 0,
    bottom: 0,
    right: 0,
  },
});
