import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pictureInputErrorMessageStyle: {
    color: "#d50000",
    paddingLeft: 20,
    paddingTop: 5,
    fontFamily: "Roboto",
    fontSize: 10.5,
  },
  pictureInputHeaderTextStyle: {
    color: "#888",
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  pictureInputHeaderTextStyleHasErrors: {
    color: "#d50000",
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  pictureInputHorizontalRuleStyle: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  pictureInputHorizontalRuleStyleHasErrors: {
    borderBottomColor: "#d50000",
    borderBottomWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});
