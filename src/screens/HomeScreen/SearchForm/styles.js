import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;

export const styles = StyleSheet.create({
  searchFormWrapperStyle: {
    flex: 1,
    backgroundColor: tertiaryColorDark,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
});
