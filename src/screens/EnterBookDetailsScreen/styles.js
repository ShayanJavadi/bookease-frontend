import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
const {
  primaryColor,
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
    backgroundColor: primaryColor,
    flex: 1,
    height: 50,
  },
  pictureInputWrapperStyle: {
    flex: 5.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    marginLeft: 80,
    marginRight: 80,
  },
  pictureInputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    zIndex: 9999,
    borderColor: "#bbb",
    borderWidth: 1,
  },
  pictureCarouselWrapperStyle:{
    paddingTop: 20,
    marginLeft: 60,
    marginRight: 60,
  },
  pictureCarouselStyle: {
    height: 300,
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
    justifyContent: "center",
    margin: 0,
    padding: 22,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContentStyle: {
     justifyContent: "center",
     alignItems: "center",
     flexDirection: "row",
     paddingTop: 35,
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
  pictureInputHeaderTextStyle: {
    color: "#888",
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Roboto",
  },
  pictureInputHorizontalRuleStyle: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
};
