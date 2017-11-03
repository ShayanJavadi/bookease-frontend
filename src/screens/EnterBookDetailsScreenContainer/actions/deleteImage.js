import { FileSystem } from "expo"
import updateImages from "./updateImages";

const deleteImage = (uri) => async (dispatch) => {
  FileSystem.deleteAsync(uri)
    .then(() => {
      dispatch(updateImages());
    })
}

export default deleteImage;
