import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { shape, func } from "prop-types";
import SearchResultCard from "./SearchResultCard";

const bookResults = [
  {
    name: "Discrete Mathematics and its applications",
    author: "Kenneth H. Rosen",
    edition: "2nd",
    condition: "Excellent",
    isbn: "9782391239812312377",
    owner: "John Doe",
    university: "University of North Texas",
    price: "12",
    description: "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can.",
    thumbnail: "http://i.ebayimg.com/images/g/wqEAAOSwsXFZIheF/s-l1600.jpg",
  }, {
    name: "Algorithms and Something",
    author: "Douglas E. Ensley, J. Winston Crawley",
    edition: "2nd",
    condition: "Good",
    isbn: "9782812312377339913",
    owner: "Jane Doe",
    university: "University of North Texas",
    price: "30",
    description: "This was bought for an undergraduate course in Analysis of Algorithms. While the book definitely is a good book and is the go-to book for algorithms courses, it actually is more of a graduate level book. As my professor explains it, it is a very mathy book and is not suited well for undergraduate (even though he made us undergraduates get it...), it's only use in undergrad is the fact you can get it while in undergrad and take it with you to graduate school.",
    thumbnail: "http://i.ebayimg.com/images/g/~HcAAOSwl1xZp0yu/s-l1600.jpg",
  }, {
    name: "Modern Webapps with COBOL and Fortran",
    author: "Amanda Chetwynd, Peter Diggle",
    edition: "12nd",
    condition: "Fair",
    isbn: "9782391833312312377",
    owner: "Some Guy",
    university: "University of North Texas",
    price: "100",
    description: "I got what I paid for. This is the cheaper edition, so I didn't expect to much. low quality of paper ( I can see the opposite page content). But, the content is just the same as better quality one",
    thumbnail: "http://i.ebayimg.com/images/g/X~YAAOSwqYZZp0QO/s-l1600.jpg",
  },
];

export default class SearchResults extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  renderSearchResults(book) {
    console.log(book);
    return (
      <SearchResultCard
        navigation={this.props.navigation}
        key={book.id}
        book={book}
      />
    );
  }

  render() {
    console.log(this.props.textbooks);
    if (this.props.loading) {
      return (
        <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
          <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
              size="large"
            />
          </View>
        </View>
      )
    }


    return (
      <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
        <FlatList
          data={this.props.textbooks}
          renderItem={({ item }) => this.renderSearchResults(item)}
          keyExtractor={item => item.isbn}
        />
      </View>
    );
  }
}
