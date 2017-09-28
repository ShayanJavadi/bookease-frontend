import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColorLight,
  tertiaryColorDark,
} = palette;

export const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: tertiaryColorDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
    height: 70,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 16
  },
  pictureInputWrapperStyle: {
    flex: 5.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 90,
    paddingRight: 90,
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
    paddingBottom: 50,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "100",
  },
  buttonContainerStyle: {
    backgroundColor: primaryColorLight,
    flex: 1,
    height: 50,
  },
  pictureInputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 260,
    zIndex: 9999,
    borderColor: "#bbb",
    borderWidth: 1,
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
  textInputStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionTextInputStyle: {
     marginTop: 20,
     paddingLeft: 20,
     paddingRight: 20,
     paddingBottom: 10,
     marginRight: 20,
     marginLeft: 20,
     borderRadius: 1,
     borderWidth: 0.5,
  },
  modalWrapperStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentStyle: {
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  }
};
