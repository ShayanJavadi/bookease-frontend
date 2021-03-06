import React from "react";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { node } from "prop-types";
import { reducer as form } from "redux-form";
import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import base64 from "base-64";
import { BACKEND_AUTHENTICATION_HEADER, BACKEND_URL } from "src/config.json";
import { facebookAuthReducer, googleAuthReducer } from "../screens/AuthScreenContainer/reducers";
import phonePinValidationReducer from "../screens/PhonePinScreenContainer/reducers";
import phonePasswordValidationReducer from "../screens/EnterPasswordScreenContainer/reducers";
import changePasswordSubmitReducer from "../screens/ChangePasswordScreenContainer/reducers"
import schoolSelectionReducer from "../screens/SchoolSelectionScreenContainer/reducers";
import scanBookReducer from "../screens/ScanBookScreenContainer/reducers";
import EnterBookDetailsReducer from "../screens/EnterBookDetailsScreenContainer/reducers";
import EnterBookDetailsCameraReducer from "../screens/EnterBookDetailsCameraScreenContainer/reducers/";
import SessionReducer from "../screens/SessionContainer/reducers/index";
import MyBooksListingsScreenReducer from "../screens/MyBooksListingsScreenContainer/reducers/";

const networkInterface = createNetworkInterface({
  uri: `${BACKEND_URL}/graphql`,
  opts: {
    credentials: "include",
  },
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = `Basic ${base64.encode(BACKEND_AUTHENTICATION_HEADER)}`;
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });

const reducers = combineReducers({
  form,
  schoolSelectionReducer,
  facebookAuthReducer,
  googleAuthReducer,
  phonePinValidationReducer,
  phonePasswordValidationReducer,
  changePasswordSubmitReducer,
  scanBookReducer,
  EnterBookDetailsReducer,
  EnterBookDetailsCameraReducer,
  MyBooksListingsScreenReducer,
  apollo: client.reducer(),
  Session: SessionReducer
});

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk, client.middleware()),
  ),
);

const Provider = props => (
  <ApolloProvider store={store} client={client}>
    {props.children}
  </ApolloProvider>
);

Provider.propTypes = {
  children: node.isRequired,
};

export default Provider;
