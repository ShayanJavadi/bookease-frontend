import {
  PASSWORD_ACCEPTED,
  PASSWORD_NOT_ACCEPTED,
} from "../actions/consts";

const INITIAL_STATE = {
  isPasswordValid: false,
  updateCounter: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PASSWORD_ACCEPTED:
      return {
        updateCounter: state.updateCounter + 1,
        isPasswordValid: true,
      };
    case PASSWORD_NOT_ACCEPTED:
      return {
        updateCounter: state.updateCounter + 1,
        isPasswordValid: false,
      };
    default:
      return state;
  }
};
