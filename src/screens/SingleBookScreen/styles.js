import { StyleSheet, Dimensions } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const STICKY_BUTTON_CONTAINER_HEIGHT = 70;

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  screenStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: STICKY_BUTTON_CONTAINER_HEIGHT,
  },
  bookImageWrapperStyle: {
    flex: 3,
    backgroundColor: "#f1f1f1",
    height: 400,
  },
  bookImageStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  favoriteButtonWrapperStyle: {
    position: "absolute",
    right: 20,
    top: 15,
    backgroundColor: "transparent",
    zIndex: 9999,
  },
  bookImageLinearGradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 120,
    zIndex: 9998
  },
  priceChipWrapperStyle: {
    position: "absolute",
    bottom: 18,
    left: 15,
    borderRadius: 33,
    width: 66,
    borderWidth: 3,
    borderColor: primaryColor,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  priceChipStyle: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 21,
    paddingRight: 3,
  },
  bookDetailsWrapperStyle: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 25,
    zIndex: 9999,
  },
  bookDetailsTitleWrapperStyle: {
    paddingTop: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: SCREEN_WIDTH,
  },
  bookDetailsTitleStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 28,
    fontWeight: "600",
  },
  bookDetailsTextWrapperStyle: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  bookDetailsTextKeyStyle: {
    fontSize: 20,
    color: "#444",
    fontWeight: "500"
  },
  bookDetailsTextValueStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 20,
    color: "#666",
  },
  accountDetailsWrapperStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  accountDetailsNameStyle: {
    color: "#444",
    fontWeight: "500",
    paddingBottom: 3,
    fontSize: 18,
  },
  accountDetailsPostedStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 17,
    color: "#666",
  },
  buttonsWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: SCREEN_HEIGHT - STICKY_BUTTON_CONTAINER_HEIGHT,
    height: STICKY_BUTTON_CONTAINER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    zIndex: 9999,
  },
  buttonWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  askButtonContainerStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#F50057",
  },
  askButtonTextStyle: {
    fontSize: 18,
  },
  offerButtonContainerStyle: {
    height: 40,
  },
  offerButtonTextStyle: {
    fontSize: 18,
  },
  bookDetailsLowerSectionWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 10,
    zIndex: 9999,
  },
  bookDescriptionWrapperStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  bookDescriptionStyle: {
    fontSize: 18,
    color: "#666",
    lineHeight: 25
  },
  questionsWrapperStyle: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 25,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#f4f4f4",
  },
  questionsTitleWrapperStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
    zIndex: 9999,
  },
  questionsTitleStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 25,
  },
  questionWrapperStyle: {
    flexDirection: "row",
    paddingVertical: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingHorizontal: 20,
  },
  questionUsernameStyle: {
    fontWeight: "600",
    fontSize: 19,
    color: "#333",
    textAlign: "left",
    paddingBottom: 2,
    paddingTop: 8,
  },
  questionUserAvatarStyle: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  questionRecipientStyle: {
    fontWeight: "700",
    color: primaryColor,
  },
  questionTextStyle: {
    textAlign: "left",
    color: "#666",
    fontSize: 17,
    lineHeight: 24,
  },
  questionDateWrapperStyle: {
    flex: .4,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  questionDateStyle: {
    color: "#999",
    paddingTop: 8,
    fontSize: 13
  },
  noQuestionsWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingBottom: 15,
  },
  noQuestionsStyle: {
    textAlign: "left",
    flex: 1,
    color: "#555",
  },
});
