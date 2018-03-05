import { StyleSheet } from "react-native";

const STICKY_BUTTON_CONTAINER_HEIGHT = 70;

export const styles = StyleSheet.create({
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: STICKY_BUTTON_CONTAINER_HEIGHT,
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
});
