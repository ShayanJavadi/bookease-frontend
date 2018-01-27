import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import queries from "./graphql/queries";
import SchoolSelectionScreen from "../SchoolSelectionScreen";

const { searchForSchoolsQuery, changeSchoolMutation } = queries;

const mapStateToProps = ({ schoolSelectionReducer, Session }) => ({
  schools: schoolSelectionReducer.schools,
  currentUser: Session.currentUser,
});

const Container = compose(
  graphql(searchForSchoolsQuery, {
    options: props => ({ variables: { query: props.query || "", limit: 5 } }),
  }),
  graphql(changeSchoolMutation, {
    options: props => ({ variables: { email: props.email || "", phone: props.phone || "", password: props.password || "" } }),
  })
);


export default Container(connect(
  mapStateToProps,
  actions,
)(SchoolSelectionScreen));
