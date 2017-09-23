import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import * as actions from "./actions";
import EmailScreen from "../EmailScreen";

// move to another
const mapStateToProps = ({ emailValidationReducer }) => ({ isEmailValid: emailValidationReducer.isEmailValid });

// pick out actions
export default connect(mapStateToProps, actions)(EmailScreen);
