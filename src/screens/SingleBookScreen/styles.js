import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const STICKY_BUTTON_CONTAINER_HEIGHT = 70;

export const styles = StyleSheet.create({
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: STICKY_BUTTON_CONTAINER_HEIGHT,
  },
  buttonsWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: SCREEN_HEIGHT - STICKY_BUTTON_CONTAINER_HEIGHT,
    height: STICKY_BUTTON_CONTAINER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    zIndex: 9999,
  },
  buttonWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  askButtonContainerStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#F50057",
  },
  askButtonTextStyle: {
    fontSize: 18,
  },
  offerButtonContainerStyle: {
    height: 40,
  },
  offerButtonTextStyle: {
    fontSize: 18,
  },
  modalWrapperStyle: {
    justifyContent: "center",
    margin: 0,
    padding: 22,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
