import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import SearchResultCard from './SearchResultCard';

const bookResults = [
  {
    name: 'Discrete Mathematics and its applications',
    edition: '2nd',
    condititon: 'Excellent',
    isbn: '9782391239812312377',
    owner: 'John Doe',
    university: 'University of North Texas',
    price: '12',
  }, {
    name: 'Algorithms and Something',
    edition: '2nd',
    condititon: 'Good',
    isbn: '9782812312377339913',
    owner: 'Jane Doe',
    university: 'University of North Texas',
    price: '30',
  }, {
    name: 'Modern Webapps with COBOL and Fortran',
    edition: '12nd',
    condititon: 'Fair',
    isbn: '9782391833312312377',
    owner: 'Some Guy',
    university: 'University of North Texas',
    price: '100',
  }
]

export default class SearchResults extends Component {
  renderSearchReults(bookResults) {
    return bookResults.map((book, index) => {
      return (
        <SearchResultCard
          key={book.isbn}
          book={book}
        />
      )
    });
  }

  render() {
    return (
      <View style={{ flex: 6 }}>
        <ScrollView>
          {this.renderSearchReults(bookResults)}
        </ScrollView>
      </View>
    )
  }
}
