import React from "react";
import {connect} from "react-redux";
import * as actions from "./actions";
import AuthScreen from "../AuthScreen";

// move to another
const mapStateToProps = ({facebookAuthReducer}) => ({facebookAuthToken: facebookAuthReducer.token});

// pick out actions
export default connect(mapStateToProps, actions)(AuthScreen);
