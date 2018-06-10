import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import queries from "./graphql/queries";
import HomeScreen from "../HomeScreen";
import updateSessionPushNotificationTokenMutation from "./graphql/mutations/updateSessionPushNotificationToken";

const { getTextbooksQuery } = queries;
const mapStateToProps = (state) => ({ currentStoredUser: state.Session.currentStoredUser });

const Container = compose(
  graphql(getTextbooksQuery, {
    options: props => ({ variables: { query: props.query || "", orderBy: props.orderBy || "relevance" } }),
    name: "getTextbooksQuery",
  }),
  graphql(updateSessionPushNotificationTokenMutation, {
    options: props => ({ variables: { token: props.token || "" }, fetchPolicy: "cache-first" }),
    name: "updateSessionPushNotificationTokenMutation",
  }),
);

export default Container(connect(
  mapStateToProps,
  actions,
)(HomeScreen));
