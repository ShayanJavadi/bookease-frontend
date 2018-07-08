import {
  UPDATE_STORED_USER,
  STORED_USER_STORAGE_KEY,
} from "./consts";
import { AsyncStorage } from "react-native";

const getStoredSessionUserInformation = () => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STORED_USER, payload: { user: null, isLoading: true } });
    const currentUser = await AsyncStorage.getItem(STORED_USER_STORAGE_KEY);

    return dispatch({
      type: UPDATE_STORED_USER,
      payload: {
        user: currentUser ? JSON.parse(currentUser) : null,
        isLoading: false
      }
    });
  } catch (error) {
    return error.message;
  }
};

export default getStoredSessionUserInformation;
