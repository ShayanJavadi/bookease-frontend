import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import TabBarComponent from "../TabBarComponent";

const { getMyNotifications } = queries;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getMyNotifications, {
    name: "getMyNotificationsQuery"
  }),
)

export default Container(connect(
  mapStateToProps,
)(TabBarComponent));
