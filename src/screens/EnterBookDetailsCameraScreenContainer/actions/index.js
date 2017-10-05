import { FileSystem, Camera } from 'expo';
import { Vibration } from "react-native"
import {
  UPDATE_PHOTOS
} from "./consts";

export const takePicture = (camera, navigation) => async (dispatch) => {
  if (!camera) {
    return;
  }

  let result = await camera.takePictureAsync({ base64: true });

  console.log(result);
  FileSystem.moveAsync({
    from: result.uri,
    to: `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`,
  })
    .then(() => {
      FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
        .then((files) => {
          const photos = [];
          files.map((file, index) => {
            photos.push({ uri: `${FileSystem.documentDirectory}photos/${file}`, key: index })
          })
          console.log(photos);
          dispatch({ type: UPDATE_PHOTOS, payload: photos})
        })
    });
  Vibration.vibrate();
};
