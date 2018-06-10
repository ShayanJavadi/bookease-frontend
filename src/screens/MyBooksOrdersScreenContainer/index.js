import { graphql, compose } from "react-apollo";
import queries from "./graphql/queries";
import MyBooksOrdersScreen from "../MyBooksOrdersScreen";

const { getMyBuyRequestsQuery } = queries;

export default compose(
  graphql(getMyBuyRequestsQuery, {
    name: "getMyBuyRequestsQuery",
  }),
)(MyBooksOrdersScreen);
