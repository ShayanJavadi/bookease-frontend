import {
  UPDATE_IMAGES,
  CAMERA_RQ,
  CAMERA_RS,
} from "../actions/consts";

const INITIAL_STATE = {
  images: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_IMAGES:
      return { ...state, images: action.payload, loading: false }
    case CAMERA_RQ:
      return { ...state, images: [], loading: true }
    case CAMERA_RS:
      return { ...state, loading: false }
    default:
      return state;
  }
};
