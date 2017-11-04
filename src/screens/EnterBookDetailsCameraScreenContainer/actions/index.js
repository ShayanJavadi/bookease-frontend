import { FileSystem } from "expo";
import { Vibration } from "react-native"
import {
  UPDATE_IMAGES,
  CAMERA_RQ,
  CAMERA_RS,
} from "./consts";

export const createImagesFolder = () => (dispatch) => {
  dispatch({ type: CAMERA_RQ })
  FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}images`)
  .catch(() => {
    return dispatch({ type: CAMERA_RS });
  })
    .then(() => {
      dispatch({ type: UPDATE_IMAGES, payload: [] });
    })
}

export const updateImages = () => (dispatch) => {
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}images`)
    .then((files) => {
      const images = [];
      files.map((file, index) => {
        images.push({ uri: `${FileSystem.documentDirectory}images/${file}`, key: index })
      })
      dispatch({ type: UPDATE_IMAGES, payload: images });
    })
}

export const takePicture = (camera) => async (dispatch) => {
  if (!camera) {
    return;
  }

  let result = await camera.takePictureAsync({ base64: true });

  FileSystem.moveAsync({
    from: result.uri,
    to: `${FileSystem.documentDirectory}images/Image_${Date.now()}.jpg`,
  })
    .then(() => {
      dispatch(updateImages());
      Vibration.vibrate();
    });
};
