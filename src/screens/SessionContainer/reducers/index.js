import {
  UPDATE_STORED_USER,
} from "../actions/consts";
import initialState from "./initialState";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_STORED_USER:
      return { currentStoredUser: payload.user, isLoading: payload.isLoading };
    default:
      return state;
  }
}
