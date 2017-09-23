import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import SearchForm from "../../modules/SearchForm";
import SearchResults from "../../modules/SearchResults";

const { screenStyle } = styles;

const HomeScreen = () => (
  <View style={screenStyle}>
    <SearchForm />
    <SearchResults />
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
