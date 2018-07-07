import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;

export const styles = StyleSheet.create({
  pictureInputWrapperStyle: {
    flex: 5.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pictureInputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 260,
    zIndex: 9999,
    flexDirection: "row",
  },
  pictureInputStyleHasErrors: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 260,
    zIndex: 9999,
    flexDirection: "row",
  },
  pictureCarouselStyle: {
    height: 260,
  },
  pictureCarouselWrapperStyle:{
    zIndex: 9999,
  },
  carouselSlidesWrapperStyle: {
    flex: 1,
    zIndex: 9999
  },
  carouselDeleteButtonWrapperStyle: {
    position: "relative",
    flexDirection: "row",
    top: 1000,
    left: 9,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
