import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import AuthScreen from '../AuthScreen';

// move to another
const mapStateToProps = (reducers) => {
  console.log(reducers);
  //console.log(facebookAuthReducer.facebookAuthReducer);
  //console.log(facebookAuthReducer.googleAuthReducer);
  return {
    facebookAuthToken: facebookAuthReducer.facebookAuthReducer.token,
    // googleAuthToken: googleAuthReducer.token
   };
}

// pick out actions
export default connect(mapStateToProps, actions)(AuthScreen);
