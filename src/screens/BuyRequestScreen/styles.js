import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const { palette } = uiTheme;
const {
  primaryColor,
  primaryColorLight,
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 90,
  },
  messageTextInputStyle: {
     marginTop: 20,
     paddingLeft: 20,
     paddingRight: 20,
     paddingBottom: 10,
     marginRight: 20,
     marginLeft: 20,
     borderRadius: 1,
     borderWidth: 0.5,
     backgroundColor: "#fff",
  },
  messageTextInputContainerStyle: {
    flex: 5,
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  disabledButtonContainerStyle: {
    height: 50,
    width: SCREEN_WIDTH * 0.9,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
});
