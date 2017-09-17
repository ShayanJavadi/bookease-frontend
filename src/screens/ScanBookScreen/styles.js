import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  tertiaryColorDark,
} = palette;

export const styles = {
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerStyle: {
    backgroundColor: tertiaryColorDark,
  },
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 13,
  },
};
