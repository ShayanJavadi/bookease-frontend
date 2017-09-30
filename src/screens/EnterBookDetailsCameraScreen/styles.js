import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;

const {
  tertiaryColorDark,
} = palette;

export const styles = {
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
    fontSize: 16
  },
};
