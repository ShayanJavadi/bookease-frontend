import { FileSystem, Camera } from 'expo';
import { Vibration } from "react-native"
import {
  UPDATE_PHOTOS,
  CAMERA_RQ,
  CAMERA_RS,
  RESET_STATE,
} from "./consts";

export const createPhotosFolder = () => (dispatch) => {
  console.log('creating phot dir');
  dispatch({ type: CAMERA_RQ })
  FileSystem.makeDirectoryAsync(
    FileSystem.documentDirectory + 'photos'
  ).catch(e => {
    return dispatch({ type: CAMERA_RS });
  })
    .then(() => {
      dispatch({ type: UPDATE_PHOTOS, payload: []});
    })
}

export const updatePhotos = () => (dispatch) => {
  console.log('updating photos in camera');
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
    .then((files) => {
      const photos = [];
      files.map((file, index) => {
        photos.push({ uri: `${FileSystem.documentDirectory}photos/${file}`, key: index })
      })
      dispatch({ type: UPDATE_PHOTOS, payload: photos});
    })
}

export const takePicture = (camera, navigation) => async (dispatch) => {
  console.log('taking pic');
  if (!camera) {
    return;
  }

  let result = await camera.takePictureAsync({ base64: true });

  FileSystem.moveAsync({
    from: result.uri,
    to: `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`,
  })
    .then(() => {
      dispatch(updatePhotos());
    });
  Vibration.vibrate();
};
