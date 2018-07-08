import {
  UPDATE_STORED_USER,
  STORED_USER_STORAGE_KEY,
} from "./consts";
import { AsyncStorage } from "react-native";

const removeStoredUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem(STORED_USER_STORAGE_KEY);
    return dispatch({ type: UPDATE_STORED_USER, payload: { user: undefined } });
  } catch (error) {
    return error.message;
  }
};

export default removeStoredUser;
