import { Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColorLight,
  primaryColorLighter
} = palette;

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = {
  screenStyle : {
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
    paddingLeft: SCREEN_WIDTH * 0.05,
    paddingRight: SCREEN_WIDTH * 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    height: 60,
    width: SCREEN_WIDTH * 0.12,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 24,
    backgroundColor: "#fff",
    color: "#424242",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  invalidInputStyle: {
    height: 60,
    width: SCREEN_WIDTH * 0.12,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
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
  invalidPinTextStyle: {
    fontSize: 20,
    fontWeight: "300",
    color: "red",
    paddingTop: 10,
    paddingBottom: 15,
  },
  buttonContainerStyle: {
    marginTop: 100,
    backgroundColor: primaryColorLight,
    height: 50,
    width: SCREEN_WIDTH * 0.85,
  },
  disabledButtonContainerStyle: {
    marginTop: 100,
    backgroundColor: primaryColorLighter,
    height: 50,
    width: SCREEN_WIDTH * 0.85,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
};
