import { StyleSheet, Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 90,
    flexDirection: "column",
    paddingBottom: 250,
  },
  buttonWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  meetingButtonWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  markAsDoneButtonWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  declineButtonContainerStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#F50057",
  },
  declineButtonTextStyle: {
    fontSize: 17.5,
  },
  acceptButtonContainerStyle: {
    height: 40,
  },
  acceptButtonTextStyle: {
    fontSize: 17.5,
  },
  activityIndicatorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 150,
  },
  markAsDoneModalRadioButtonWrapperStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  markAsDoneModalRadioButtonTextStyle: {
    paddingLeft: 5,
    fontSize: 16,
    color: "#666"
  }
});
