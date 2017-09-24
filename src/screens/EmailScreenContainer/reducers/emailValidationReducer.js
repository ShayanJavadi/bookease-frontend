import {
  EMAIL_VALID,
  EMAIL_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isEmailValid: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_VALID:
      return { isEmailValid: true, };
    case EMAIL_INVALID:
      return { isEmailValid: false, };
    default:
      return state;
  }
};
