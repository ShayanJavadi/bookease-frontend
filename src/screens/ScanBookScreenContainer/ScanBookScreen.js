import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import queries from "./graphql/queries";
import ScanBookScreen from "../ScanBookScreen";

const { lookupTextbooksQuery } = queries;

export default graphql(lookupTextbooksQuery, {
  options: (props) => ({ variables: { query: props.query, limit: 1 } }),
})(ScanBookScreen);
