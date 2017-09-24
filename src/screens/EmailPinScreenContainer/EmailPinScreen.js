import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PinScreen from "../PinScreen";

const { validatePinQuery } = queries;

const mapStateToProps = ({ pinValidationReducer }) => ({

});

const Container = graphql(validatePinQuery, {
  options: props => ({ variables: { query: props.query || "", limit: 5 } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PinScreen));
