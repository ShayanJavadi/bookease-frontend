import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bookImageWrapperStyle: {
    flex: 3,
    backgroundColor: "#f1f1f1",
    height: 350,
  },
  bookImageStyle: {
    flex: 1,
  },
  iconsWrapperStyle: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
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
    bottom: 18,
    left: 15,
    minWidth: 66,
    height: 30,
  },
  priceChipTextStyle: {
    fontSize: 18
  },
});
