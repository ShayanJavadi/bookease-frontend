import Expo from "expo";
export default async () => await Expo.Font.loadAsync({
  Roboto: require("../../../assets/fonts/Roboto-Regular.ttf"),
});
