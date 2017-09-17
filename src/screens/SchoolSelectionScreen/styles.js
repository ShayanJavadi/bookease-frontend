import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = {
  screenStyle: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 100,
    paddingLeft: 60,
    paddingRight: 60,
  },
  headerAutocompleteContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerStyle: {
    fontSize: 29,
    fontWeight: "100",
    paddingTop: 40,
    paddingBottom: 40,
  },
  inputStyle: {
    height: 40,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonStyle: {
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: "#222",
  },
  noButtonPaddingStyle: {
    height: SCREEN_WIDTH * 0.1,
  },
  buttonTextStyle: {
    fontWeight: "700",
  },
  schoolNameStyle: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  schoolAddressStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontStyle: "italic",
  },
};
