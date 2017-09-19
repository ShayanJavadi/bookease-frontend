import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import * as actions from "./actions";
import queries from "./graphql/queries";
import ScanBookScreen from "../ScanBookScreen";

const { lookupTextbooksQuery } = queries;

const mapStateToProps = ({ scanBookReducer }) => ({ loading: scanBookReducer.loading, scannedTextbook: scanBookReducer.scannedTextbook });

const Container = graphql(lookupTextbooksQuery, {
  options: (props) => ({ variables: { query: props.query, limit: 1 } }),
});

export default Container(connect(
  mapStateToProps,
  actions
)(ScanBookScreen));
