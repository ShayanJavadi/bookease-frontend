import {
  SCHOOL_SEARCH_RESP,
} from "./consts";

export const searchForSchool = query => async (dispatch) => {
  if (query === undefined || query === "") {
    dispatch({ type: SCHOOL_SEARCH_RESP, payload: [] });
  } else {
    const apiUrl = encodeURI(`https://bookease:zqdeiRfg@bookease-development.herokuapp.com/graphql?query={searchSchools(name:"${query}",limit:5){id,name,address}}`);
    fetch(apiUrl).then(response => response.json()).then(json => {
        if(json === undefined || json.data === undefined) {
          dispatch({ type: SCHOOL_SEARCH_RESP, payload: [] });
        }
        else {
          dispatch({ type: SCHOOL_SEARCH_RESP, payload: json.data.searchSchools });
        }
      }
    );
  }
};
