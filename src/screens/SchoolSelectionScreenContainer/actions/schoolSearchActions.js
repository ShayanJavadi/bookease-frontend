import {
  SCHOOL_SEARCH_RESP
} from './consts';

export const searchForSchool = (query) => async dispatch => {
  const apiUrl = encodeURI(`https://bookease:zqdeiRfg@bookease-development.herokuapp.com/graphql?query={searchSchools(name:"${query}",limit:10){id,name,address}}`)
  fetch(apiUrl).then(response => response.json()).then(json =>
    dispatch({ type: SCHOOL_SEARCH_RESP, payload: json.data.searchSchools })
  );
};
