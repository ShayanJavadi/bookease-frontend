import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import SearchForm from "../../modules/SearchForm";
import SearchResults from "../../modules/SearchResults";

const { screenStyle } = styles;

const HomeScreen = (props) => (
  <View style={screenStyle}>
    <SearchForm />
    <SearchResults
      navigation={props.navigation}
    />
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
