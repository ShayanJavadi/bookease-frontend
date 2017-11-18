import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  bookDetailsWrapperStyle: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 25,
    zIndex: 9999,
  },
  bookDetailsTitleWrapperStyle: {
    paddingTop: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: SCREEN_WIDTH,
  },
  bookDetailsTitleStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 28,
    fontWeight: "600",
  },
  bookDetailsTextWrapperStyle: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  bookDetailsTextKeyStyle: {
    fontSize: 20,
    color: "#444",
    fontWeight: "500",
  },
  bookDetailsTextValueStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 20,
    color: "#666",
    flex: 1,

  },
});
