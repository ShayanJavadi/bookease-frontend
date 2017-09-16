import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import facebookAuthReducer from "../screens/AuthScreenContainer/reducers";
import { reducer as form } from 'redux-form';
const reducers = combineReducers({
  form,
  facebookAuthReducer,
});


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
  ),
);

export default store;
