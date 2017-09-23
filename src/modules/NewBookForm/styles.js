import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColorLight,
} = palette;

export const styles = {
  formWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textInputWrapperStyle: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  inputWrapperStyle: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#fff",
    zIndex: 9999,
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
};
