import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;
export const SWIPE_OUT_ICON_SIZE = 25;
export const BUY_REQUEST_ICON_SIZE = 16;
export const NO_NOTTIFICATION_ICON_COLOR = tertiaryColorDark;

const {
  primaryColor,
  tertiaryColorDark,
  tertiaryColorLight,
} = palette;

export const styles = StyleSheet.create({
  notificationWrapperStyle: {
    minHeight: 130,
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginTop: 1,
  },
  notificationUpperWrapperStyle: {
    flex: 5,
  },
  notificationLowerWrapperStyle: {
    flex: 1,
    flexDirection: "row",
  },
  swipeOutStyle: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 25,
  },
  swipeOutTextStyle: {
    color: "#fff",
    fontWeight: "700",
  },
  notificationHeaderWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  notificationHeaderIconStyle: {
    color: primaryColor,
    paddingTop: 4,
  },
  notificationHeaderDateStyle: {
    color: "#888",
  },
  notificationDetailsWrapperStyle: {
    flex: 1,
  },
  notificatDetailsTextbookStyle: {
    fontWeight: "600",
    color: tertiaryColorLight,
    marginBottom: 4,
  },
  notificationHeaderTypeStyle: {
    marginLeft: 5,
    color: primaryColor,
    fontWeight: "600"
  },

  notificationAvatarWrapperStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  notificatDetailsHeaderStyle: {
    fontWeight: "500",
    marginBottom: 4,
  },
  notificatDetailsMessageStyle: {
    color: "#666",
  },
  notificationAvatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  notificationAvatarArrowIconWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "relative",
    bottom: 16,
    right: 0,
  },
  notificationAvatarArrowIconStyle: {
    color: "#fff",
  }
});
