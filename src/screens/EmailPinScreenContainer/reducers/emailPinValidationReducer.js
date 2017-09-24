import {
  PIN_VALID,
  PIN_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isPinValid: undefined,
  updateCounter: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PIN_VALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPinValid: true,
      };
    case PIN_INVALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPinValid: false,
      };
    default:
      return state;
  }
};
