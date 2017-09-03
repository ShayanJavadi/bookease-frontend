import {Dimensions} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PLUS_ICON_WIDTH = 55;

export const ICON_SIZE = 27;
export const PLUS_ICON_SIZE = 30;

export const styles = {
  sellBooksButtonStyle: {
    width: PLUS_ICON_WIDTH,
    height: PLUS_ICON_WIDTH,
    position: "absolute",
    right: (SCREEN_WIDTH / 2) - PLUS_ICON_WIDTH + 6,
    bottom: -19.7,
    backgroundColor: "#222",
    zIndex: 9999,
  },
  sellBooksButtonIconStyle: {
    fontWeight: "700",
    color: "#fff",
  },
};
