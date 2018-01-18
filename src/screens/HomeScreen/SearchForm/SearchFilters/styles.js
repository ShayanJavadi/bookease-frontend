import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchFilterWrapperStyle: {
    flex: 0.6,
    flexDirection: "row",
    paddingRight: 10,
  },
  resultsWrapperStyle: {
    flex: 2.1,
    justifyContent: "center",
    height: 40,
  },
  filterWrapperStyle: {
    flex: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  filterStyle: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    backgroundColor: "#fff",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.3)",
    marginRight: 8,
  },
  filterTextStyle: {
    paddingLeft: 15,
    color: "#555",
  },
  searchIconStyle: {
    color: "#444",
    marginTop: 10,
    marginLeft: 7,
  },
  barCodeIconStyle: {
    color: "#444",
    marginTop: 5,
    marginRight: 8,
  },
  resultsTextStyle: {
    fontSize: 14,
    textAlign: "left",
    paddingLeft: 11,
    color: "#fff",
  },
});
