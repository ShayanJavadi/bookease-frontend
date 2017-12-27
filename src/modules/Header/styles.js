import { StyleSheet, Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export const styles = StyleSheet.create({
  headerWrapperStyle: {
    backgroundColor: tertiaryColorDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    height: 90,
    position: "absolute",
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
