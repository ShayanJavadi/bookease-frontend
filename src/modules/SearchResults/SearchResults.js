import React, { Component } from "react";
import { View, FlatList } from "react-native";
import SearchResultCard from "./SearchResultCard";

const bookResults = [
  {
    name: "Discrete Mathematics and its applications",
    edition: "2nd",
    condititon: "Excellent",
    isbn: "9782391239812312377",
    owner: "John Doe",
    university: "University of North Texas",
    price: "12",
    thumbnail: "http://i.ebayimg.com/images/g/wqEAAOSwsXFZIheF/s-l1600.jpg",
  }, {
    name: "Algorithms and Something",
    edition: "2nd",
    condititon: "Good",
    isbn: "9782812312377339913",
    owner: "Jane Doe",
    university: "University of North Texas",
    price: "30",
    thumbnail: "http://i.ebayimg.com/images/g/~HcAAOSwl1xZp0yu/s-l1600.jpg",
  }, {
    name: "Modern Webapps with COBOL and Fortran",
    edition: "12nd",
    condititon: "Fair",
    isbn: "9782391833312312377",
    owner: "Some Guy",
    university: "University of North Texas",
    price: "100",
    thumbnail: "http://i.ebayimg.com/images/g/X~YAAOSwqYZZp0QO/s-l1600.jpg",
  },
];

export default class SearchResults extends Component {
  renderSearchResults(book) {
    return (
      <SearchResultCard
        key={book.isbn}
        book={book}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 6 }}>
        <FlatList
          data={bookResults}
          renderItem={({ item }) => this.renderSearchResults(item)}
          keyExtractor={item => item.isbn}
        />
      </View>
    );
  }
}
