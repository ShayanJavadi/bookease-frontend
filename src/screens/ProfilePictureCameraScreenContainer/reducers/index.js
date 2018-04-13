import {
  TAKE_PICTURE_RQ,
  TAKE_PICTURE_RS,
} from "../actions/consts";

const INITIAL_STATE = {
  image: undefined,
  isTakingPicture: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAKE_PICTURE_RQ:
      return { ...state, isTakingPicture: true }
    case TAKE_PICTURE_RS:
      return { ...state, isTakingPicture: false, image: action.payload }
    default:
      return state;
  }
};
