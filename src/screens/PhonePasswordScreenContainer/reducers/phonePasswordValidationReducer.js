import {
  PASSWORD_VALID,
  PASSWORD_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isPasswordValid: false,
  updateCounter: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PASSWORD_VALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPasswordValid: true,
      };
    case PASSWORD_INVALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPasswordValid: false,
      };
    default:
      return state;
  }
};
