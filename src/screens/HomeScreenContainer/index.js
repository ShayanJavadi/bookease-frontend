import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import updateSessionPushNotificationTokenMutation from "./graphql/mutations/updateSessionPushNotificationToken";
import HomeScreen from "../HomeScreen";

const { getTextbooksQuery } = queries;
const mapStateToProps = ({ MyBooksListingsReducer }) => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getTextbooksQuery, {
    options: props => ({ variables: { query: props.query || "", orderBy: props.orderBy || "relevance" } }),
    name: "getTextbooksQuery",
  }),
  graphql(updateSessionPushNotificationTokenMutation, {
    options: props => ({ variables: { token: props.token || "" } }),
    name: "updateSessionPushNotificationTokenMutation",
  }),
);

export default Container(connect(
  mapStateToProps,
)(HomeScreen));
