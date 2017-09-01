import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { facebookAuthReducer, googleAuthReducer } from '../screens/AuthScreenContainer/reducers';
import { schoolSelectionReducer } from '../screens/SchoolSelectionScreenContainer/reducers';

const reducers = combineReducers({
  facebookAuthReducer,
  googleAuthReducer,
  schoolSelectionReducer
});


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
