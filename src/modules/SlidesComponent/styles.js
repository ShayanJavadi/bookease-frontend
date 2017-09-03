import {Dimensions} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const ICON_SIZE = 50;

export const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  slideTextStyle: {
    fontSize: 30,
    fontWeight: "100",
    textAlign: "center",
    color: "#fff",
    marginBottom: 70,
  },
  buttonStyle: {
    backgroundColor: "#A100FF",
  },
  buttonTextStyle: {
    textAlign: "center",
    fontWeight: "100",
  },
  slideLogoStyle: {
    color: "#fff",
    paddingBottom: 60,
  },
  slideDotsStyle: {
    color: "#fff",
  },
};
