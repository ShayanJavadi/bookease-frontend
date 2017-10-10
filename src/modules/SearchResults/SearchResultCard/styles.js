import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorLight,
} = palette;

export const styles = StyleSheet.create({
  searchResultCardWrapper: {
    flex: 1,
    height: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  upperSectionWrapper: {
    flex: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fafafa",
    flexDirection: "column",
    justifyContent: "center",
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    backgroundColor: "#111",
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
    textAlign: "left",
    flex: 2,
    paddingLeft: 10,
  },
  lowerSectionRightWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
    flex: 1,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    width: 75,
  },
  bookNameStyle: {
    fontSize: 17,
    color: "#333",
    fontWeight: "100",
  },
  bookEditionStyle: {
    fontSize: 12,
    paddingLeft: 1,
    color: "#666",
  },
  bookCondititonStyle: {
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
    fontWeight: "100",
  },
  bookUniversityStyle: {
    fontSize: 10,
    color: "#666",
  },
  bookPriceStyle: {
    color: "#222",
    fontSize: 19,
    fontWeight: "100",
    paddingRight: 10,
  },
  bookPriceWrapperStyle: {
  },
  horizantalLineStyle: {
    height: 4,
    backgroundColor: tertiaryColorLight,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    zIndex: 99999,
  },
});
