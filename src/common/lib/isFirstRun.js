import { AsyncStorage } from "react-native";

export default async () => (await AsyncStorage.getItem("hasRunBefore")) !== "true";
