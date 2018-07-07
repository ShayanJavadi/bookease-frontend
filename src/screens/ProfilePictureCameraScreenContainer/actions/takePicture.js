import {
  TAKE_PICTURE_RQ,
  TAKE_PICTURE_RS,
} from "./consts";

const takePicture = (camera) => async (dispatch) => {
  if (!camera) {
    return;
  }

  dispatch({ type: TAKE_PICTURE_RQ });

  const { uri } = await camera.takePictureAsync();

  return dispatch({ type: TAKE_PICTURE_RS, payload: uri });
};

export default takePicture;
