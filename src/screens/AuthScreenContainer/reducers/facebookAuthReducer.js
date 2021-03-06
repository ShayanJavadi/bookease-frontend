import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from "../actions/consts";

const INITIAL_STATE = {
  token: undefined,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: undefined };
    default:
      return state;
  }
}
