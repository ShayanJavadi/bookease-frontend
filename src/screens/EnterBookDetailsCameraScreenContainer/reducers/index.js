import {
  UPDATE_PHOTOS
} from "../actions/consts";

const INITIAL_STATE = {
  photos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return { photos: action.payload }
    default:
      return state;
  }
};
