import React from "react";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { node } from "prop-types";
import { reducer as form } from "redux-form";
import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import { BACKEND_AUTHENTICATION_HEADER, BACKEND_URL } from "src/config.json";
import facebookAuthReducer from "../screens/AuthScreenContainer/reducers";
import emailValidationReducer from "../screens/EmailScreenContainer/reducers";
import emailPinValidationReducer from "../screens/EmailPinScreenContainer/reducers";
import phoneValidationReducer from "../screens/PhoneScreenContainer/reducers";
import phonePinValidationReducer from "../screens/PhonePinScreenContainer/reducers";
import schoolSelectionReducer from "../screens/SchoolSelectionScreenContainer/reducers";
import scanBookReducer from "../screens/ScanBookScreenContainer/reducers";

const networkInterface = createNetworkInterface({
  uri: BACKEND_URL,
  opts: {
    credentials: "include",
  },
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = `Basic ${btoa(BACKEND_AUTHENTICATION_HEADER)}`;
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });

const reducers = combineReducers({
  form,
  schoolSelectionReducer,
  facebookAuthReducer,
  emailValidationReducer,
  emailPinValidationReducer,
  phoneValidationReducer,
  phonePinValidationReducer,
  scanBookReducer,
  apollo: client.reducer(),
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
