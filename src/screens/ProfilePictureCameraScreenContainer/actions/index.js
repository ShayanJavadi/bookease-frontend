import {
  TAKE_PICTURE_RQ,
  TAKE_PICTURE_RS,
} from "./consts";

export const takePicture = (camera) => async (dispatch) => {
  if (!camera) {
    return;
  }

  dispatch({ type: TAKE_PICTURE_RQ });

  let result = await camera.takePictureAsync({ base64: true, quality: 0 });

  return dispatch({ type: TAKE_PICTURE_RS, payload: result });
};
