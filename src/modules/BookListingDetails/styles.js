import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
export const SWIPE_OUT_ICON_SIZE = 25;
export const NO_LISTING_ICON_COLOR = tertiaryColorDark;

const {
  tertiaryColorDark,
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  listingPictureWrapperStyle: {
    paddingLeft: 5,
  },
  listingPictureStyle: {
    width: 68,
    height: 84,
  },
  listingFooterWrapperStyle: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 5,
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
    fontSize: 12,
    color: "#666",
    paddingLeft: 3,
  },
  listingDetailsWrapperStyle: {
    flex: 6,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  listingNameWrapperStyle: {
    flexDirection: "row",
    paddingBottom: 1,
  },
  listingNameTextStyle: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500"
  },
  listingDetailWrapperStyle: {
    paddingVertical: 1,
  },
  listingSmallDetailsTextStyle: {
    color: "#333",
    fontSize: 12,
    flex: 1,
    fontWeight: "100",
  },
  listingWrapperStyle: {
    minHeight: 100,
    marginTop: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    paddingTop: 10,
  },
  archiveIconStyle: {
    color: tertiaryColorDark,
  },
  listingBuyRequestIconStyle: {
    color: primaryColor,
    paddingRight: 5,
    paddingTop: 1,
  },
  buyRequestOuterWrapperStyle: {
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
    paddingVertical: 8,
    flex: 1,
    paddingLeft: 25,
  },
  buyRequestInnerWrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buyRequestTextStyle: {
    paddingRight: 70,
    fontSize: 13,
    color: "#666",
  },
  acceptedBuyRequestWrapperStyle: {
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: "15%",
  },
  acceptedBuyRequestTextStyle: {
    paddingTop: 1,
    paddingRight: 13,
    fontSize: 13,
    color: "#666",
  },
  acceptedBuyRequestSection: {
    justifyContent: "flex-start",
    flexDirection: "row",
  }
});
