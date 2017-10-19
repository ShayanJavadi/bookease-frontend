import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
  primaryColorLight,
} = palette;

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContainerStyle: {
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
  inputContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    height: 40,
    width: SCREEN_WIDTH * 0.7,
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
  invalidInputStyle: {
    height: 40,
    width: SCREEN_WIDTH * 0.7,
    paddingLeft: 5,
    borderColor: "red",
    borderWidth: 1,
    fontSize: 24,
    backgroundColor: "#fff",
    color: "#424242",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  invalidPasswordTextStyle: {
    fontSize: 20,
    fontWeight: "300",
    color: "red",
    paddingTop: 10,
    paddingBottom: 15,
  },
  showHideButtonContainerStyle: {
    backgroundColor: primaryColor,
    height: 40,
    width: SCREEN_WIDTH * 0.2,
    marginLeft: 5,
  },
  showHideButtonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  submitButtonContainerStyle: {
    backgroundColor: primaryColor,
    marginTop: 100,
    marginBottom: 40,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  submitButtonDisabledContainerStyle: {
    backgroundColor: primaryColorLight,
    marginTop: 100,
    marginBottom: 40,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  submitButtonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
});
