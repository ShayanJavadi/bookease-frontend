import React from "react";
import { View } from "react-native";
import { object, func } from "prop-types";
import { styles } from "./styles";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const { screenStyle } = styles;

const HomeScreen = (props) => {
  console.log(props);
  const { getTextbooksQuery: { refetch, loading, getTextbooks }, navigation } = props;
  return (
    <View style={screenStyle}>
      <SearchForm
        searchTextbooks={refetch}
      />
      <SearchResults
        loading={loading}
        navigation={navigation}
        textbooks={getTextbooks}
      />
    </View>
  )
};

HomeScreen.navigationOptions = {
  header: null,
};

HomeScreen.propTypes = {
  navigation: object.isRequired,
  getTextbooksQuery: func.isRequired,
};

export default HomeScreen;
