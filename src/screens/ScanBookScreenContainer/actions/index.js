import { isEmpty } from "lodash";
import {
  SCAN_BOOK_RQ,
  SCAN_BOOK_SUCCESS,
  SCAN_BOOK_FAIL,
  RESET_QUERY,
} from "./consts";

export const fetchScannedBook = (refetch, scannedData) => async (dispatch) => {
  dispatch({ type: SCAN_BOOK_RQ });

  const { data } = await refetch({ query: scannedData });
  const textbooks = await data.lookupTextbooks.textbooks
  if (isEmpty(textbooks)) {
      return dispatch({ type: SCAN_BOOK_FAIL });
  }

  const scannedTextbook = await textbooks[0];

  dispatch({ type: SCAN_BOOK_SUCCESS, payload: scannedTextbook })
};

export const resetQuery = () => dispatch => {
  dispatch({ type: SCAN_BOOK_SUCCESS })
}
