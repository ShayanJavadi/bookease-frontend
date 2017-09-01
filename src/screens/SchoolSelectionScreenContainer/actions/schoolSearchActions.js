import {
  SCHOOL_SEARCH_RESP
} from './consts';

export const searchForSchool = () => async dispatch => {
  const list = ['abc', 'def', 'ghi'];
  console.log('Action');

  dispatch({ SCHOOL_SEARCH_RESP, payload: list });
};
