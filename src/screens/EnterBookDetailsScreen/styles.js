import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  formWrapperStyle: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonWrapperStyle: {
    flex: 1.6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 120,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainerStyle: {
    backgroundColor: primaryColor,
    flex: 1,
    height: 50,
  },
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
  },
  inputWrapperStyle: {
    flex: .3,
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
  bookEditionWrapperStyle: {
    flexDirection: "row",
  },
  bookEditionInputStyle: {
    textAlign: "center",
  },
  bookAuthorInputStyle: {
    textAlign: "center",
  },
  bookConditionWrapperStyle: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bookPriceInputStyle: {
    textAlign: "center",
    paddingLeft: undefined,
  },
  bookConditionInputStyle: {
    textAlign: "center",
    paddingLeft: undefined,
  },
  modalButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  modalButtonIconStyle: {
    color: "#fff",
    paddingTop: 2,
  },
  modalButtonWrapperStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
