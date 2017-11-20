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
  listingPictureWrapperStyle: {
    justifyContent: "center",
    paddingLeft: 5
  },
  listingPictureStyle: {
    flex: .9,
    width: 75,
  },
  listingsWrapperStyle: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  listingWrapperStyle: {
    height: 100,
    marginTop: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1
  },
  listingTextStyle: {
    color: "#222",
  },
  listingDetailsWrapperStyle: {
    flex: 6,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  listingNameWrapperStyle: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 1,
  },
  listingDetailsTopWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingVertical: 3
  },
  listingDetailsBottomWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingBottom: 3,
  },
  listingDateWrapperStyle: {
    flexDirection: "row",
    paddingLeft: 18,
    paddingTop: 1,
  },
  listingPriceWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1.3,
  },
  listingPriceTextStyle: {
    fontWeight: "100",
  },
  listingNameTextStyle: {
    fontSize: 14,
    color: "#222",
  },
  listingSmallDetailsTextStyle: {
    color: "#333",
    fontSize: 12,
    flex: 1,
    fontWeight: "100",
  },
  listingDateTextStyle: {
    fontSize: 12,
    color: "#777",
  },
  listingIsbnTextStyle: {
    flex: 3,
  },
  listingStatusTextStyle: {
    flex: 2,
  },
  listingEditionTextStyle: {
    flex: 1.7,
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
  modalWrapperStyle: {
    justifyContent: "center",
    margin: 0,
    padding: 22,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
