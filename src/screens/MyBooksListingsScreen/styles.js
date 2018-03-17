import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
export const SWIPE_OUT_ICON_SIZE = 25;
export const NO_LISTING_ICON_COLOR = tertiaryColorDark;

const {
  tertiaryColorDark,
} = palette;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: tertiaryColorDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    height: 70,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 16
  },
  sortWrapperStyle: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    paddingLeft: 35,
  },
  sortTextStyle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  listingsWrapperStyle: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  listingTextStyle: {
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
  noListingWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 50,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 180,
  },
  noListingIconWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  noListingTextStyle: {
    fontSize: 17,
    lineHeight: 27,
    color: "#444",
    textAlign: "center",
  },
  activityIndicatorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 150,
  },
});
