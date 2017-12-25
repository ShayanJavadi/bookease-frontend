import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { shape, func } from "prop-types";
import { isEmpty } from "lodash";
import SearchResultCard from "./SearchResultCard";
import uiTheme from "src/common/styles/uiTheme";

const renderSearchResult = (book, navigation) => {
  return (
    <SearchResultCard
      navigation={navigation}
      key={book.id}
      book={book}
    />
  );
}

const SearchResults = ({ textbooks, loading, navigation }) => {
  console.log(textbooks);

  if (loading) {
    return (
      <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
        <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            color={uiTheme.palette.tertiaryColorDark}
          />
        </View>
      </View>
    )
  }

  if (isEmpty(textbooks)) {
    return (
      <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
        <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
          <Text>No results found</Text>
        </View>
      </View>
    )
  }


  return (
    <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
      <FlatList
        data={textbooks}
        renderItem={({ item }) => renderSearchResult(item, navigation)}
        keyExtractor={item => item.isbn}
      />
    </View>
  );
}

export default SearchResults;
