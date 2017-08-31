import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { facebookAuthReducer, googleAuthReducer } from '../screens/AuthScreenContainer/reducers';
console.log(facebookAuthReducer);
const reducers = combineReducers({
  facebookAuthReducer,
  googleAuthReducer
});


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
