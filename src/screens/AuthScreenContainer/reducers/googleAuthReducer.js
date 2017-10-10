import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from "../actions/consts";

const INITIAL_STATE = {
  token: undefined,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return { token: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return { token: undefined };
    default:
      return state;
  }
}
