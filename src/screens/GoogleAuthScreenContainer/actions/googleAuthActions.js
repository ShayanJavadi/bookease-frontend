import { Google } from "expo";
import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from "./consts";

export const googleLogin = () => async dispatch => {
  try {
    const result = await Google.logInAsync({
      androidClientId: "444414301047-3fu57n2v9ug96rgl9g04fqc4jl5pen86.apps.googleusercontent.com",
      iosClientId: "444414301047-cd4okaanaqrr9b218abbs9ign0tm4bot.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: result.accessToken });
    } else {
      return dispatch({ type: GOOGLE_LOGIN_FAIL })
    }
  } catch(e) {
    return dispatch({ type: GOOGLE_LOGIN_FAIL })
  }
};
