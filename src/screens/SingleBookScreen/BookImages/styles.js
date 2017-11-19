import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  bookImageWrapperStyle: {
    flex: 3,
    backgroundColor: "#f1f1f1",
    height: 400,
  },
  bookImageStyle: {
    flex: 1,
  },
  favoriteButtonWrapperStyle: {
    position: "absolute",
    right: 20,
    top: 15,
    backgroundColor: "transparent",
    zIndex: 9999,
  },
  bookImageLinearGradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 120,
    zIndex: 9998
  },
  priceChipWrapperStyle: {
    position: "absolute",
    bottom: 18,
    left: 15,
    borderRadius: 33,
    width: 66,
    borderWidth: 3,
    borderColor: primaryColor,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  priceChipStyle: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 21,
    paddingRight: 3,
  },
});
