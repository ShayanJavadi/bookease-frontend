import {
  UPDATE_STORED_USER,
  STORED_USER_STORAGE_KEY,
} from "./consts";
import { AsyncStorage } from "react-native";

const setStoredUser = (user) => async (dispatch) => {
  try {
    await AsyncStorage.setItem(STORED_USER_STORAGE_KEY, JSON.stringify(user));
    return dispatch({ type: UPDATE_STORED_USER, payload: { user } });
  } catch (error) {
    return error.message;
  }
};

export default setStoredUser;
