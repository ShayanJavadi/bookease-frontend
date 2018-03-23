import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

const { palette } = uiTheme;
const {
  primaryColor,
} = palette;

export const styles = StyleSheet.create({
  questionsWrapperStyle: {
    flex: 1,
    paddingBottom: 25,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  questionsTitleWrapperStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  questionsTitleStyle: {
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 25,
    fontWeight: "600",
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
    fontSize: 17,
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
    fontSize: 14,
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
