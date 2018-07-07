import { ImagePicker } from "expo"
import uploadImage from "src/common/lib/uploadImage";
import {
  IS_UPLOADING,
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
} from "./consts";

const selectImage = ({ currentStoredUser, updatePhotoUrl, setStoredUserData }) => async (dispatch) => {
  dispatch({ type: IMAGE_GALLERY_OPEN });

try{
  const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (!result.cancelled) {
    dispatch({ type: IS_UPLOADING });

    const uploadedPhotoUri = await uploadImage(result.uri);
    const newProfileData = Object.assign({}, currentStoredUser);
    newProfileData.photoURL = uploadedPhotoUri;

    await updatePhotoUrl({
      variables: {
        phoneNumber: currentStoredUser.phoneNumber,
        photoUrl: uploadedPhotoUri,
      }
    });

    await setStoredUserData(newProfileData);
  }
}catch(ex){console.log(ex);}

  return dispatch({ type: IMAGE_GALLERY_CLOSED });
}

export default selectImage;
