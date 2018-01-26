import {
  UPDATE_USER,
} from "../actions/consts";
import initialState from "./initialState";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER:
      return { currentUser: payload  };
    default:
      return state;
  }
}
