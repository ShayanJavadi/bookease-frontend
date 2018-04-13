import { graphql, compose } from "react-apollo";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import SingleBookScreen from "../SingleBookScreen";

const { getTextbookQuery, getSessionQuery } = queries;
const { deleteTextbookMutation, createBookmarkMutation, deleteBookmarkMutation } = mutations;

export default compose(
  graphql(getSessionQuery, {
    name: "getSessionQuery",
  }),
  graphql(getTextbookQuery, {
    name: "getTextbookQuery",
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
  }),
  graphql(deleteTextbookMutation, {
    name: "deleteTextbookMutation",
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
  }),
  graphql(createBookmarkMutation, {
    name: "createBookmarkMutation",
    options: props => ({ variables: { bookmark: props.bookmark || {} } }),
  }),
  graphql(deleteBookmarkMutation, {
    name: "deleteBookmarkMutation",
    options: props => ({ variables: { bookmark: props.bookmark || {} } }),
  }),
)(SingleBookScreen);
