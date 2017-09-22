import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = {
  screenStyle: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingLeft: 60,
    paddingRight: 60,
  },
  topContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: 29,
    fontWeight: "100",
    paddingTop: 40,
    paddingBottom: 40,
  },
  inputStyle: {
    height: 40,
    width: SCREEN_WIDTH * 0.9,
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#424242",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dropDownStyle : {
    width: SCREEN_WIDTH * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dropDownItemStyle : {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonContainerStyle: {
    backgroundColor: "#f50057",
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.9,
  },
  disabledButtonContainerStyle: {
    backgroundColor: "#f8bbd0",
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  noResultsContainerStyle : {
    height: SCREEN_HEIGHT * 0.4,
  },
  noResultsTextStyle: {
    color: "#222",
  },
  schoolNameStyle: {
    color: "#222",
    paddingTop: 5,
    paddingBottom: 5,
  },
  schoolAddressStyle: {
    color: "#666",
    paddingTop: 5,
    paddingBottom: 5,
    fontStyle: "italic",
  },
};
