import React, { Component } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import SearchForm from "../../modules/SearchForm";
import SearchResults from "../../modules/SearchResults";

const { screenStyle } = styles;

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
     <View style={screenStyle}>
       <SearchForm />
       <SearchResults />
     </View>
    );
  }
}

export default HomeScreen;
