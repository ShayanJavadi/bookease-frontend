import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import facebookAuthReducer from '../screens/AuthScreenContainer/reducers';

const reducers = combineReducers({
  facebookAuthReducer
});


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
