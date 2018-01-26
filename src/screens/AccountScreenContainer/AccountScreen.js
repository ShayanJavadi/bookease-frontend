import { connect } from "react-redux";
import * as actions from "./actions";
import AccountScreen from "../AccountScreen";

// move to another
const mapStateToProps = (state) => ({
    currentUser: state.Session.currentUser,
});

// pick out actions
export default connect(mapStateToProps, actions)(AccountScreen);
