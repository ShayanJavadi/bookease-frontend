import {
  UPDATE_STORED_USER,
} from "./consts";
import { AsyncStorage } from "react-native";

const getStoredSessionUserInformation = () => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STORED_USER, payload: { user: null, isLoading: true } });
    const currentUser = await AsyncStorage.getItem("currentUser");

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
