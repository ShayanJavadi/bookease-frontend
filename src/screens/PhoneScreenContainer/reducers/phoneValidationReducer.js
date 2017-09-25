import {
  PHONE_VALID,
  PHONE_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  isPhoneValid: false,
  phoneNumber: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHONE_VALID:
      return {
        isPhoneValid: true,
        phoneNumber: action.payload,
      };
    case PHONE_INVALID:
      return {
        isPhoneValid: false,
        phoneNumber: action.payload,
      };
    default:
      return state;
  }
};
