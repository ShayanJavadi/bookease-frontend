import { FileSystem, Camera } from 'expo';
import { Vibration } from "react-native"
import {
  INCREMENT_PHOTO_ID
} from "./consts";

export const takePicture = (camera, photoId) => async (dispatch) => {
  console.log(camera);
  console.log(photoId);
  if (!camera) {
    return;
  }

  console.log(camera);
  let result = await camera.takePictureAsync({ base64: true });
  console.log(result);
  // .then(data => {
  //   console.log(data);
  //   console.log(data.base64)
  //   console.log(data.uri);
  //   FileSystem.moveAsync({
  //     from: data,
  //     to: `${FileSystem.documentDirectory}photos/Photo_${photoId}.jpg`,
  //   })
  //   .then(() => {
  //     FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}photos/Photo_0.jpg`)
  //       .then((photos) => console.log(photos))
  //   //  dispatch({ type: INCREMENT_PHOTO_ID, payload: photoId + 1})
  //   });
    Vibration.vibrate();


};
