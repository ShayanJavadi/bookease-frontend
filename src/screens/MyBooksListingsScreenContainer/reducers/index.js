import {
  PIN_VALID,
  PIN_INVALID,
} from "../actions/consts";

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
