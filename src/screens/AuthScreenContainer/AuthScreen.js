import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import AuthScreen from '../AuthScreen';

// move to another
const mapStateToProps = ({facebookAuthReducer, googleAuthReducer}) => {
  console.log(facebookAuthReducer);
  console.log(googleAuthReducer);

  return {
    facebookAuthToken: facebookAuthReducer.token,
    googleAuthToken: googleAuthReducer.token
   };
}

// pick out actions
export default connect(mapStateToProps, actions)(AuthScreen);
