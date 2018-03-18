import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  searchResultCardWrapper: {
    flex: 1,
    height: 400,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  upperSectionWrapper: {
    flex: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f8f8f8",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 9999,
  },
  upperSectionTopWrapper: {
    paddingTop: 3,
    paddingBottom: 6,
  },
  upperSectionBottomWrapper: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  middleSectionWrapper: {
    flex: 11,
    height: undefined,
    width: undefined,
    backgroundColor: "#f1f1f1",
  },
  lowerSectionWrapper: {
    flex: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  lowerSectionLeftWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flex: 4,
  },
  lowerSectionRightWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    width: 70,
    height: 35
  },
  bookNameStyle: {
    fontSize: 17,
    color: "#222",
  },
  bookEditionStyle: {
    fontSize: 12,
    paddingLeft: 1,
    color: "#666",
  },
  bookconditionStyle: {
    fontSize: 12,
    color: "#666",
    paddingLeft: 15,
  },
  bookIsbnStyle: {
    fontSize: 12,
    color: "#333",
  },
  bookOwnerStyle: {
    color: "#222",
    paddingBottom: 2,
    fontSize: 14,
  },
  bookCreatedAtStyle: {
    fontSize: 12,
    color: "#666",
  },
  bookPriceWrapperStyle: {},
  priceChipWrapperStyle: {
    bottom: "16%",
    left: 15,
    minWidth: 50,
    height: 25,
  },
  priceChipTextStyle: {
    fontSize: 16
  },
});
