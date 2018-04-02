import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  carouselSlidesWrapperStyle: {
    flex: 1,
    flexDirection: "row"
  },
  carouselDeleteButtonWrapperStyle: {
    position: "absolute",
    width: 30,
    top: 39,
    left: 9,
    zIndex: 9999,
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
