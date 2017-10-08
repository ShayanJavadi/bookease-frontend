import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 14,
    paddingTop: 1,
    paddingRight: 2,
    paddingLeft: 8,
    backgroundColor: "#fff",
    color: "#424242",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapperStyle: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  inputValidStyle: {
    borderColor: "#53E69D",
    borderWidth: 1,
  },
  inputInvalidStyle: {
    borderColor: "#F55E64",
    borderWidth: 1,
  },
});
