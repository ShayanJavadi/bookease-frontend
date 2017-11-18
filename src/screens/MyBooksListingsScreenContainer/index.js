import { graphql } from "react-apollo";
import { connect } from "react-redux";
// import * as actions from "./actions";
import queries from "./graphql/queries";
import MyBooksListingsScreen from "../MyBooksListingsScreen";

const { getMyTextbooksQuery } = queries;

const mapStateToProps = ({ MyBooksListingsReducer }) => ({});

const Container = graphql(getMyTextbooksQuery);

export default Container(connect(
  mapStateToProps,
)(MyBooksListingsScreen));
