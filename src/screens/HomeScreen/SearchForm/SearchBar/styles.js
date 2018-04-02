import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchBarWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  inputStyle: {
    flex: 1,
    paddingTop: 1,
    paddingRight: 2,
    paddingLeft: 3,
    width: 90,
    height: 40,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#424242",
  },
  searchIconStyle: {
    color: "#444",
    marginTop: 9,
    marginLeft: 3,
  },
  barCodeScanWrapperStyle: {
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.3)",
  },
  barCodeIconStyle: {
    color: "#444",
    paddingTop: 5,
    marginRight: 8,
  },
  filterIconStyle: {
    color: "#444",
    paddingTop: 5,
    marginRight: 8,
    marginLeft: 4
  },
  clearSearchIconWrapperStyle: {
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.3)",
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    flex: .15,
  },
  clearSearchIconStyle: {
    marginTop: 2,
    marginRight: 5,
    padding: 5,
  }
});
