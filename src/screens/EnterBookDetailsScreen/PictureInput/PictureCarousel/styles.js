import { StyleSheet, Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";
const SCREEN_WIDTH = Dimensions.get("window").width;

export const { palette } = uiTheme;

export const styles = StyleSheet.create({
  pictureInputWrapperStyle: {
    flex: 5.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  pictureInputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 350,
    zIndex: 9999,
    borderColor: "#bbb",
    borderWidth: 1,
  },
  pictureInputStyleHasErrors: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 350,
    zIndex: 9999,
    borderColor: "#d50000",
    borderWidth: 2,
  },
  pictureCarouselWrapperStyle:{
    marginLeft: 70,
    marginRight: 70,
  },
  pictureCarouselStyle: {
    height: 350,
  },
  pictureInputActionButtonStyle: {
     right: -38,
     bottom: -38,
     position: "absolute",
     zIndex: 9999
  },
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
