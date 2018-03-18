import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;

const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  bookDetailsWrapperStyle: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 25,
    zIndex: 9999,
  },
  bookDetailsTitleWrapperStyle: {
    paddingHorizontal: 20,
    flexDirection: "row",
    width: SCREEN_WIDTH,
    paddingTop: 15,
  },
  bookDetailsTitleStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 25,
    fontWeight: "600",
  },
  bookDetailsTextWrapperStyle: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  bookDetailsTextKeyStyle: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  bookDetailsTextValueStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 16,
    color: "#666",
    flex: 1,
    fontWeight: "400",
  },
  listingFooterWrapperStyle: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 3,
    paddingHorizontal: 20,
  },
  listingFooterSectionWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  listingFooterIconStyle: {
    color: primaryColor,
  },
  listingFooterTextStyle: {
    fontSize: 13,
    color: "#666",
    paddingLeft: 3,
  },
});
