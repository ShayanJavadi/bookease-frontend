import {
  PIN_VALID,
  PIN_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isPinValid: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PIN_VALID:
      return { isPinValid: true, };
    case PIN_INVALID:
      return { isPinValid: false, };
    default:
      return state;
  }
};
