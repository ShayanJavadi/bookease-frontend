import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from "../actions/consts";

const INITIAL_STATE = {
  googleAuthToken: undefined,
  updateCounter: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return { googleAuthToken: action.payload, updateCounter: state.updateCounter + 1 };
    case GOOGLE_LOGIN_FAIL:
      return { googleAuthToken: undefined, updateCounter: state.updateCounter + 1 };
    default:
      return state;
  }
}
