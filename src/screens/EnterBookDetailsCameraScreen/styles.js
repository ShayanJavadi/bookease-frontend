import { Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CAPTURE_BUTTON_OUTER_WIDTH = 70;
const CAPTURE_BUTTON_INNER_WIDTH = CAPTURE_BUTTON_OUTER_WIDTH - 10;
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
  topRowWrapperStyle: {
    flex: 0.9,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  bottomRowWrapperStyle: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: "center",
  },
  flashIconWrapperStyle: {
    marginTop: 20,
    marginLeft: 15,
  },
  captureButtonWrapperStyle: {
    position: "absolute",
    left: SCREEN_WIDTH / 2 - (CAPTURE_BUTTON_OUTER_WIDTH / 2),
    bottom: 15,
  },
  captureButtonOuterStyle: {
    borderWidth: 3,
    borderColor: "#fff",
    height: CAPTURE_BUTTON_OUTER_WIDTH,
    width: CAPTURE_BUTTON_OUTER_WIDTH,
    borderRadius: CAPTURE_BUTTON_OUTER_WIDTH / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  captureButtonInnerStyle: {
    backgroundColor: "#fff",
    height: CAPTURE_BUTTON_INNER_WIDTH,
    width: CAPTURE_BUTTON_INNER_WIDTH,
    borderRadius: CAPTURE_BUTTON_INNER_WIDTH / 2
  },
};
