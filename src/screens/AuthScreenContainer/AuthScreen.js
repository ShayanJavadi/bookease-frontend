import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import * as actions from "./actions";
import AuthScreen from "../AuthScreen";

// move to another
const mapStateToProps = ({ facebookAuthReducer }) => ({ facebookAuthToken: facebookAuthReducer.token });

// pick out actions
export default connect(mapStateToProps, actions)(AuthScreen);
