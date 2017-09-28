import { connect } from "react-redux";
import * as actions from "./actions";
import EnterBookDetailsScreen from "../EnterBookDetailsScreen";

const mapStateToProps = ({ EnterBookDetailsReducer }) => ({
  errorsMessages: EnterBookDetailsReducer.errorsMessages,
});

export default connect(
  mapStateToProps,
  actions,
)(EnterBookDetailsScreen);
