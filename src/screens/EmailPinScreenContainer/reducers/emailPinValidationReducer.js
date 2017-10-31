import {
  PIN_VALID,
  PIN_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isPinValid: false,
  profileData: { },
  updateCounter: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PIN_VALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPinValid: true,
        profileData: { id: action.payload.id, email: action.payload.email },
      };
    case PIN_INVALID:
      return {
        updateCounter: state.updateCounter + 1,
        isPinValid: false,
        userId: action.payload,
      };
    default:
      return state;
  }
};
