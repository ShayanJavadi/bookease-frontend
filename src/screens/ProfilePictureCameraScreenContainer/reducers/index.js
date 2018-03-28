import {
  UPDATE_IMAGES,
  CAMERA_RQ,
  CAMERA_RS,
  TAKE_PICTURE_RQ,
  TAKE_PICTURE_RS,
} from "../actions/consts";

const INITIAL_STATE = {
  images: [],
  loading: false,
  isTakingPicture: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_IMAGES:
      return { ...state, images: action.payload, loading: false }
    case CAMERA_RQ:
      return { ...state, images: [], loading: true }
    case CAMERA_RS:
      return { ...state, loading: false }
    case TAKE_PICTURE_RQ:
      return { ...state, isTakingPicture: true }
    case TAKE_PICTURE_RS:
      return { ...state, isTakingPicture: false }
    default:
      return state;
  }
};
