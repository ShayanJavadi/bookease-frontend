import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from "./consts";

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem("fb_token");

  if (token) {
    dispatch({ FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

export const getFacebookUserData = async (token) => {
  const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
  const userInfoJson = await userInfoResponse.json();

  return {
    email: userInfoJson.email,
    name: userInfoJson.name,
    uid: userInfoJson.id,
    picture: userInfoJson.picture.data.is_silhouette ? undefined : userInfoJson.picture.data.url
  };
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync("122107125107711", {
    permissions: ["email"]
  });

  if (type === "cancel") {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem("fb_token", token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
