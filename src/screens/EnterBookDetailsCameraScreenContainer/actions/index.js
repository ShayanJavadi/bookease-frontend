import { FileSystem, Camera } from 'expo';
import { Vibration } from "react-native"
import {
  INCREMENT_PHOTO_ID
} from "./consts";

export const takePicture = (camera, photoId) => async (dispatch) => {
  console.log(photoId);
  if (!camera) {
    return;
  }

  let result = await camera.takePictureAsync({ base64: true });
  console.log(result);
  FileSystem.moveAsync({
    from: result,
    to: `${FileSystem.documentDirectory}photos/Photo_${photoId}.jpg`,
  })
    .then(() => {
      FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}photos/Photo_0.jpg`)
        .then((photos) => console.log(photos))
    });
  Vibration.vibrate();


};
