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
  ghostButtonContainerStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#F50057",
  },
  ghostButtonTextStyle: {
    fontSize: 18,
  },
  raisedButtonContainerStyle: {
    height: 40,
  },
  raisedButtonTextStyle: {
    fontSize: 18,
  },
  headerTextStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 25,
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "600",
  },
  buyRequestWrapperStyle: {
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1
  },
  noBuyRequestsWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingBottom: 15,
    height: 50
  },
  noBuyRequestsStyle: {
    textAlign: "left",
    flex: 1,
    color: "#555",

  },
});
