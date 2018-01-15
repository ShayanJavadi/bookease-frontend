import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
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
    fontWeight: "100",
    fontSize: 13,
  },
});
