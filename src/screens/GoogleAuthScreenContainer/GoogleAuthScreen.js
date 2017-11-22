import { connect } from "react-redux";
import * as actions from "./actions";
import GoogleAuthScreen from "../GoogleAuthScreen";

const mapStateToProps = ({ googleAuthReducer }) => {
  return {
    googleAuthToken: googleAuthReducer.googleAuthToken,
    updateCounter: googleAuthReducer.updateCounter,
   };
}

// pick out actions
export default connect(mapStateToProps, actions)(GoogleAuthScreen);
