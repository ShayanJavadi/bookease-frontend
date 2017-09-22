import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import SchoolSelectionScreen from "../SchoolSelectionScreen";

const { searchForSchoolsQuery } = queries;

const mapStateToProps = ({ schoolSelectionReducer }) => ({
  schools: schoolSelectionReducer.schools,
});

const Container = graphql(searchForSchoolsQuery, {
  options: props => ({ variables: { query: props.query, limit: 5 } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(SchoolSelectionScreen));
