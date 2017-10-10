import {
  SCAN_BOOK_RQ,
  SCAN_BOOK_SUCCESS,
  SCAN_BOOK_FAIL,
  RESET_QUERY,
} from "../actions/consts";

const INITIAL_STATE = {
  loading: false,
  scannedTextbook: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCAN_BOOK_RQ:
      return { loading: true };
    case SCAN_BOOK_SUCCESS:
      return { loading: false, scannedTextbook: action.payload };
    case SCAN_BOOK_FAIL:
      return { loading: false, scannedTextbook: null };
    case RESET_QUERY:
      return INITIAL_STATE;
    default:
      return state;
  }
};
