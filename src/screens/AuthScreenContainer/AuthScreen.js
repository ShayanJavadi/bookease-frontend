import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import AuthScreen from '../AuthScreen';

const AuthScreenContainer = () => {
  return (
    <AuthScreen />
  )
}

const mapStateToProps = ({ facebookAuthReducer }) => {
  return { facebookAuthToken: facebookAuthReducer.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
