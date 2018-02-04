import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1.1,
    backgroundColor: "#fff",
  },
  containerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1.1,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: .3 },
    shadowOpacity: 0.1,
    zIndex: 9999,
  },
  imageContainerStyle: {
    flex: 1.5,
  },
  textContainerStyle: {
    flex: 5,
    justifyContent: "center",
  },
  titleTextStyle: {
    paddingTop: 6,
    fontSize: 18,
    color: "#444",
    paddingLeft: 15,
  },
  priceTextStyle: {
    fontSize: 20,
    paddingTop: 5,
    fontWeight: "700",
    paddingLeft: 15,
  },
});
