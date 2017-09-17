import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { styles } from "./styles";
import SearchForm from "../../modules/SearchForm";
import SearchResults from "../../modules/SearchResults";

const { screenStyle } = styles;

class HomeScreenComponent extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    console.log(this);
    return (
     <View style={screenStyle}>
       <SearchForm />
       <SearchResults />
     </View>
    );
  }
}

const query = gql`
  query lookupTextbooksQuery($query: String, $limit: Int) {
    lookupTextbooks (query: $query, limit: $limit) {
      totalItems
      textbooks {
        id
        title
        description
      }
    }
  }
`;

const HomeScreen = graphql(query, {
  options: { variables: { query: "discrete math", limit: 10 } },
})(HomeScreenComponent);

export default HomeScreen;
