import {
  SCHOOL_SEARCH_RESP,
} from "./consts";

export const searchForSchool = (refetch, query) => async (dispatch) => {
  if (query === undefined || query === "") {
    dispatch({ type: SCHOOL_SEARCH_RESP, payload: [] });
  } else {
    const result = await refetch({ query: query });

    if (result.data === undefined) {
      dispatch({ type: SCHOOL_SEARCH_RESP, payload: [] });
    }

    else {
      dispatch({ type: SCHOOL_SEARCH_RESP, payload: result.data.searchSchools });
    }
  }
};
