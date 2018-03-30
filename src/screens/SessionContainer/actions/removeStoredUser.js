import {
  UPDATE_STORED_USER,
} from "./consts";
import { AsyncStorage } from "react-native";

const removeStoredUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("currentUser");
    return dispatch({ type: UPDATE_STORED_USER, payload: { user: undefined } });
  } catch (error) {
    return error.message;
  }
};

export default removeStoredUser;
