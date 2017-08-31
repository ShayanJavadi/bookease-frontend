import { combineReducers } from 'redux'
import facebookAuthReducer from './facebookAuthReducer';
import googleAuthReducer from './googleAuthReducer'

export default combineReducers({
  facebookAuthReducer,
  googleAuthReducer,
});
