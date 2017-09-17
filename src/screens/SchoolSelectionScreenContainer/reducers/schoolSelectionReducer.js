import {
  SCHOOL_SEARCH_RESP,
} from "../actions/consts";

const INITIAL_STATE = {
  schools: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHOOL_SEARCH_RESP:
      return { schools: action.payload };
    default:
      return state;
  }
};
