import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  searchResultCardWrapper: {
    flex: 1,
    height: 400,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
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
  },
  lowerSectionLeftWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 2,
    paddingLeft: 10,
  },
  lowerSectionRightWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: SCREEN_WIDTH * .069,
    flex: 1,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontSize: 13,
    color: "#fff",
    fontWeight: "700",
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    width: 75,
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
  bookPriceStyle: {
    color: "#666",
    fontSize: 19,
    paddingRight: 15,
  },
  bookPriceWrapperStyle: {
  },
});
