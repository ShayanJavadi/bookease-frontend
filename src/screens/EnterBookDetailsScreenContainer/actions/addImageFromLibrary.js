import { FileSystem } from "expo";
import updateImages from "./updateImages";
import {
  IMAGE_GALLERY_CLOSED,
} from "./consts";

const addImageFromLibrary = (result, dispatch) => {
  FileSystem.moveAsync({
    from: result.uri,
    to: `${FileSystem.documentDirectory}images/Image_${Date.now()}.jpg`,
  })
    .then(() => {
      dispatch({ type: IMAGE_GALLERY_CLOSED });
      dispatch(updateImages());
    });
}

export default addImageFromLibrary;
