import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backButtonWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  backButtonHeaderLessWrapperStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: 20,
    left: 2,
    backgroundColor: "transparent",
  },
  backButtonTextStyle: {
    color: "#fff",
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonIconStyle: {
    color: "#fff",
  },
});
