import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import facebookAuthReducer from "../screens/AuthScreenContainer/reducers";

const reducers = combineReducers({
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
