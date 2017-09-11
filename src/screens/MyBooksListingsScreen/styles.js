import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const SWIPE_OUT_ICON_SIZE = 25;
export const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: "#fafafa",
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
    flex: 10,
    backgroundColor: "#fff",
  },
  listingWrapperStyle: {
    height: 75,
    marginTop: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    paddingLeft: 20,
    paddingBottom: 1,
  },
  listingDetailsTopWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 23,
  },
  listingDetailsBottomWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 23,
  },
  listingDateWrapperStyle: {
    flexDirection: "row",
    paddingLeft: 21,
    paddingTop: 1,
  },
  listingPriceWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  listingPriceTextStyle: {
    fontWeight: "100",
  },
  listingNameTextStyle: {
    fontSize: 14,
    color: "#444",
  },
  listingSmallDetailsTextStyle: {
    color: "#333",
    fontSize: 12,
    flex: 1,
    fontWeight: "100",
  },
  listingDateTextStyle: {
    fontSize: 12,
    color: "#555",
  },
  listingIsbnTextStyle: {
    flex: 3,
  },
  listingConditionTextStyle: {
    flex: 2,
  },
  listingAuthorTextStyle: {
    flex: 3,
  },
  listingStatusTextStyle: {
    flex: 2,
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
};
