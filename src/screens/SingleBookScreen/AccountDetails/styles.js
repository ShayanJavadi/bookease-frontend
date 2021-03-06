import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  accountDetailsWrapperStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  accountDetailsNameStyle: {
    color: "#444",
    fontWeight: "500",
    paddingBottom: 3,
    fontSize: 14,
  },
  accountDetailsPostedStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 14,
    color: "#666",
  },

  bookDetailsLowerSectionWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 10,
    zIndex: 9999,
  },
});
