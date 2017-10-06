import {
  UPDATE_PHOTOS,
  CAMERA_RQ,
  CAMERA_RS,
  RESET_STATE,
} from "../actions/consts";

const INITIAL_STATE = {
  photos: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return { photos: action.payload, loading: false }
    case CAMERA_RQ:
      return { photos: [], loading: true }
    case CAMERA_RS:
      return { loading: false }
    case RESET_STATE:
      return INITIAL_STATE
    default:
      return state;
  }
};
