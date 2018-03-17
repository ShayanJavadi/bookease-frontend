import { Dimensions, StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    paddingTop: 90,
  },
  noNotificationWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 50,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 180,
  },
  noNotificationIconWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  noNotificationTextStyle: {
    fontSize: 17,
    lineHeight: 27,
    color: "#444",
    textAlign: "center",
  },
  notificationsWrapperStyle: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  notificationWrapperStyle: {
    height: 100,
    marginTop: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1
  },
  activityIndicatorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // TODO: take care of this magic number
    height: SCREEN_HEIGHT / 2 + 150,
  },
});
