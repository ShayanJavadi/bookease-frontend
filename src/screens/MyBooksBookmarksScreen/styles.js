import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;
export const SWIPE_OUT_ICON_SIZE = 25;
export const NO_BOOKMARKS_ICON_COLOR = tertiaryColorDark;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
  bookmarksWrapperStyle: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  bookmarkTextStyle: {
    color: "#222",
  },
  swipeOutStyle: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 25,
  },
  swipeOutTextStyle: {
    color: "#fff",
    fontWeight: "700",
  },
  noBookmarksWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 50,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 180,
  },
  noBookmarksIconWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  noBookmarksTextStyle: {
    fontSize: 17,
    lineHeight: 27,
    color: "#444",
    textAlign: "center",
  },
  activityIndicatorWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 150,
  },
});
