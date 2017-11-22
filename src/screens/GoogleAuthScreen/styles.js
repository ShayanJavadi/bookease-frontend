import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor, // eslint-disable-line no-unused-vars
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 190,
  },
  activitySpinnerStyle: {
    marginTop: 100,
    marginBottom: 40,
    height: 80,
  },
});
