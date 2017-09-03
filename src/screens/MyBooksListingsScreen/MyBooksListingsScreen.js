import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";
import {styles} from "./styles";

const {screenStyle} = styles;

const listings = [
  {
    name: "Discrete Mathematics and its applications",
    edition: "2nd",
    condititon: "Excellent",
    isbn: "9782391239812312377",
    owner: "John Doe",
    university: "University of North Texas",
    price: "12",
    timePosted: "5m",
  }, {
    name: "Algorithms and Something",
    edition: "2nd",
    condititon: "Good",
    isbn: "9782812312377339913",
    owner: "Jane Doe",
    university: "University of North Texas",
    price: "30",
    timePosted: "3h",
  }, {
    name: "Modern Webapps with COBOL and Fortran",
    edition: "12nd",
    condititon: "Fair",
    isbn: "9782391833312312377",
    owner: "Some Guy",
    university: "University of North Texas",
    price: "100",
    timePosted: "2w",
  },
];


export default class MyBooksListingsScreen extends Component {
  renderMyListings(listing) {
    <View>
      <Text>Listings</Text>
    </View>
  }

  render() {
    return (
      <View style={screenStyle}>
        <View>
          <Text>SORT BY</Text>
        </View>
        <FlatList
          data={listings}
          renderItem={({listing}) => this.renderMyListings(listing)}
          keyExtractor={listing => listing.isbn}
        />
      </View>
    );
  }
}
