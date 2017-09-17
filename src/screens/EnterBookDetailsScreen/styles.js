import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColorLight,
  tertiaryColorDark,
} = palette;

export const styles = {
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerStyle: {
    backgroundColor: tertiaryColorDark,
  },
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 13,
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 260,
    zIndex: 9999,
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
  bookTitleInputWrapperStyle: {

  },
  bookTitleInputStyle: {

  },
  bookIsbnWrapperStyle: {

  },
  bookIsbnInputStyle: {

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
};
