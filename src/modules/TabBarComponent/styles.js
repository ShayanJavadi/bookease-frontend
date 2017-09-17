import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PLUS_ICON_WIDTH = 56;
const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;

export const ICON_SIZE = 27;
export const PLUS_ICON_SIZE = 30;
export const BOTTOM_NAVIGATION_ICON_SIZE = 24;
export const ACTION_BUTTON_COLOR = "#ff9900";
export const FIRST_TAB_COLOR = tertiaryColorDark;

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
