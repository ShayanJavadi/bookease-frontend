import { BACKEND_AUTHENTICATION_HEADER, BACKEND_URL } from "src/config.json";
import base64 from "base-64";

const uploadImage = ({ imageUri, imageName, imageType }) => { // eslint-disable-line no-unused-vars
  const api =`${BACKEND_URL}/upload`;
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    name: imageName,
    type: `image/${imageType}`,
  });

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization:`Basic ${base64.encode(BACKEND_AUTHENTICATION_HEADER)}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  return fetch(api, options);
}

export default uploadImage;
