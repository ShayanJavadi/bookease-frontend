import {
  UPDATE_USER,
} from "./consts";
import { AsyncStorage } from "react-native";

const updateUser = (user) => async (dispatch) => {
  const isAuthenticated = user !== undefined;
  const keyExists = AsyncStorage.getItem("currentUser") !== undefined;

  if (isAuthenticated) {
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
  }
  else if (keyExists) {
    await AsyncStorage.removeItem("currentUser");
  }

  dispatch({ type: UPDATE_USER, payload: user });
};

export default updateUser;
