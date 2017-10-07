import {
  UPDATE_PHOTOS,
  CAMERA_RQ,
  CAMERA_RS,
} from "../actions/consts";

const INITIAL_STATE = {
  photos: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return { ...state, photos: action.payload, loading: false }
    case CAMERA_RQ:
      return { ...state, photos: [], loading: true }
    case CAMERA_RS:
      return { ...state, loading: false }
    default:
      return state;
  }
};
