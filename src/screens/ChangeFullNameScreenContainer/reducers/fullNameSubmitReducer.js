import {
  FULL_NAME_VALID,
  FULL_NAME_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isFullNameValid: false,
  updateCounter: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FULL_NAME_VALID:
      return {
        updateCounter: state.updateCounter + 1,
        isFullNameValid: true,
      };
    case FULL_NAME_INVALID:
      return {
        updateCounter: state.updateCounter + 1,
        isFullNameValid: false,
      };
    default:
      return state;
  }
};
