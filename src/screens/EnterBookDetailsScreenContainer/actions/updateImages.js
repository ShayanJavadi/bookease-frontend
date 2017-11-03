import { FileSystem } from "expo"
import {
  UPDATE_IMAGES,
} from "./consts";

const updateImages = () => async (dispatch) => {
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}images`)
    .then((files) => {
      const images = [];
      files.map((file, index) => {
        images.push({ uri: `${FileSystem.documentDirectory}images/${file}`, key: index })
      })
      return dispatch({ type: UPDATE_IMAGES, payload: images });
    })
}

export default updateImages;
