import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import NotificationScreen from "../NotificationScreen";

const { getMyNotifications } = queries;
const { updateNotification } = mutations;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getMyNotifications, {
    name: "getMyNotificationsQuery"
  }),
  graphql(updateNotification, {
    options: props => ({ variables: { notification: props.notification || {} } }),
    name: "updateNotificationMutation",
  }),
)

export default Container(connect(
  mapStateToProps,
)(NotificationScreen));
