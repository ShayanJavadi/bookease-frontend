import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  carouselSlidesWrapperStyle: {
    flex: 1,
    width: SCREEN_WIDTH - 120,
  },
  carouselDeleteButtonWrapperStyle: {
    position: "relative",
    flexDirection: "row",
    top: 39,
    left: 9,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
