import {
  UPDATE_STORED_USER,
} from "./consts";
import { AsyncStorage } from "react-native";

const setStoredUser = (user) => async (dispatch) => {
  try {
    const currenUser = JSON.stringify(user)
    await AsyncStorage.setItem("currentUser", currenUser);
    return dispatch({ type: UPDATE_STORED_USER, payload: { user: user } });
  } catch (error) {
    return error.message;
  }
};

export default setStoredUser;
