import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PLUS_ICON_WIDTH = 56;

export const ICON_SIZE = 27;
export const PLUS_ICON_SIZE = 30;

export const styles = {
  sellBooksButtonStyle: {
    zIndex: 9999,
    bottom: 150,
    left: 20,
  },
  sellBooksButtonIconStyle: {
    fontWeight: "700",
    color: "#fff",
  },
};
