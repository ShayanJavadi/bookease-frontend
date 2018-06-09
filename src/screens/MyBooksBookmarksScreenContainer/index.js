import { graphql, compose } from "react-apollo";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import MyBooksBookmarksScreen from "../MyBooksBookmarksScreen";

const { getMyBookmarksQuery } = queries;
const { deleteBookmarkMutation } = mutations;

export default compose(
  graphql(getMyBookmarksQuery, {
    name: "getMyBookmarksQuery",
  }),
  graphql(deleteBookmarkMutation, {
    name: "deleteBookmarkMutation",
    options: props => ({ variables: { bookmark: props.bookmark || {} } }),
  }),
)(MyBooksBookmarksScreen);
