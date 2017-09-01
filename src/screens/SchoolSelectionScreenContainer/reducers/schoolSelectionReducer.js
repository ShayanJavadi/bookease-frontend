import {
  SCHOOL_SEARCH_RESP,
} from '../actions/consts';

const INITIAL_STATE = {
  schools: undefined,
}

export default (state = INITIAL_STATE, action) => {
  console.log('school search reducer');
  console.log(action);
  switch (action.type) {
    case SCHOOL_SEARCH_RESP:
      console.log('SCHOOL_SEARCH_RESP reducer');
      console.log(action.payload);
      return { schools: action.payload };
    default:
      return state;
  }
}
