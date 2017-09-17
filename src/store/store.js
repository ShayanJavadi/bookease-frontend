import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import facebookAuthReducer from "../screens/AuthScreenContainer/reducers";
import { schoolSelectionReducer } from "../screens/SchoolSelectionScreenContainer/reducers";


const reducers = combineReducers({
  facebookAuthReducer,
  schoolSelectionReducer,
});


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
  ),
);

export default store;
