import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export const TAB_INDICATOR_COLOR = primaryColor;

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: tertiaryColorDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    height: 70,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    top: 35
  },
  tabWrapperStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  }
});
