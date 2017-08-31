import { AsyncStorage } from 'react-native';
import {
  TWITTER_LOGIN_SUCCESS,
  TWITTER_LOGIN_FAIL
} from './consts';

export const twitterLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('twitter_token');

  if (token) {
    dispatch({ TWITTER_LOGIN_SUCCESS, payload: token });
  } else {
    doTwiterLogin(dispatch);
  }
};

const doTwiterLogin = async dispatch => {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '444414301047-3fu57n2v9ug96rgl9g04fqc4jl5pen86.apps.googleusercontent.com',
      iosClientId: '444414301047-cd4okaanaqrr9b218abbs9ign0tm4bot.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: result.accessToken });
    } else {
      return dispatch({ type: GOOGLE_LOGIN_FAIL})
    }
  } catch(e) {
    return dispatch({ type: GOOGLE_LOGIN_FAIL})
  }
};


const _handleTwitterRedirect = async (event) => {
    if (!event.url.includes('+/redirect')) {
      return;
    }

    // Parse the response query string into an object.
    const [, queryString] = event.url.split('?');
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=');
      map[key] = value; // eslint-disable-line
      return map;
    }, {});

    const verifier = responseObj.oauth_verifier;
    const accessTokenURL = accessTokenEndpoint + this._toQueryString({
      oauth_verifier: verifier,
      oauth_token: authToken,
      oauth_token_secret: secretToken,
    });

    const accessTokenResult = await fetch(accessTokenURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(res => res.json());

    const accessTokenResponse = accessTokenResult.accessTokenResponse;
    const username = accessTokenResponse.screen_name;

    this.setState({ username });
    Exponent.WebBrowser.dismissBrowser();
};

const _loginWithTwitter = async () => {
    // Call your backend to get the redirect URL, Exponent will take care of redirecting the user.
    const redirectURLResult = await fetch(redirectURLEndpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(res => res.json());
    authToken = redirectURLResult.token;
    secretToken = redirectURLResult.secretToken;
    await Exponent.WebBrowser.openBrowserAsync(redirectURLResult.redirectURL);
};

const _toQueryString = params => {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
