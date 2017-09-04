import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";
import {styles} from "./styles";
import {Button} from "react-native-material-ui";
import Swipeout from 'react-native-swipeout';

const {
  screenStyle,
  sortWrapperStyle,
  sortTextStyle,
  listingsWrapperStyle,
  listingWrapperStyle,
  listingTextStyle,
  listingDetailsWrapperStyle,
  listingButtonWrapperStyle,
  listingNameWrapperStyle,
  listingNameTextStyle,
  listingDetailsTopWrapperStyle,
  listingSmallDetailsTextStyle,
  listingDetailsBottomWrapperStyle,
  listingDateWrapperStyle,
  listingDateTextStyle,
  listingPriceWrapperStyle,
  listingPriceTextStyle,
  listingIsbnTextStyle,
  listingConditionTextStyle,
  listingStatusTextStyle,
  listingAuthorTextStyle
} = styles;

const listings = [
  {
    name: "Discrete Mathematics and its applications",
    edition: "2nd",
    condition: "Excellent",
    isbn: "9782391239812312377",
    owner: "John Doe",
    university: "University of North Texas",
    price: "12",
    timePosted: "5m",
    author: "Thomas H. Cormen",
    status: "active",
  }, {
    name: "Algorithms and Something",
    edition: "2nd",
    condition: "Good",
    isbn: "9782812312377339913",
    owner: "Jane Doe",
    university: "University of North Texas",
    price: "30",
    timePosted: "3h",
    author: "Ronald McDonald",
    status: "sold",
  }, {
    name: "Modern Webapps with COBOL and Fortran",
    edition: "12nd",
    condition: "Fair",
    isbn: "9782391833312312377",
    owner: "Some Guy",
    university: "University of North Texas",
    price: "100",
    timePosted: "2w",
    author: "Miller Levine",
    status: "sold",
  },
];


export default class MyBooksListingsScreen extends Component {
  renderMyListings(listing) {
    const {
      name,
      edition,
      condition,
      isbn,
      owner,
      timePosted,
      price,
      status,
      author
    } = listing;
    
    const swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { console.log('delete') }
    }];

    return (
      <Swipeout right={swipeBtns}
       autoClose='true'
       backgroundColor= 'transparent'>
        <View style={listingWrapperStyle}>
          <View style={listingDetailsWrapperStyle}>
            <View style={listingNameWrapperStyle}>
              <Text style={listingNameTextStyle}>{name}</Text>
            </View>
            <View style={listingDetailsTopWrapperStyle}>
              <Text style={[listingSmallDetailsTextStyle, listingStatusTextStyle]}>status: {status}</Text>
              <Text style={[listingSmallDetailsTextStyle, listingAuthorTextStyle]}>author: {author}</Text>
            </View>
            <View style={listingDetailsBottomWrapperStyle}>
            <Text style={[listingSmallDetailsTextStyle, listingConditionTextStyle]}>condition: {condition}</Text>
              <Text style={[listingSmallDetailsTextStyle, listingIsbnTextStyle]}>isbn: {isbn}</Text>
            </View>
            <View style={listingDateWrapperStyle}>
              <Text style={listingDateTextStyle}>{timePosted}</Text>
            </View>
          </View>
          <View style={listingPriceWrapperStyle}>
            <Text style={listingPriceTextStyle}>${price}</Text>
          </View>
        </View>
      </Swipeout>
    );
  }

  render() {
    return (
      <View style={screenStyle}>
        <View style={sortWrapperStyle}>
          <Text style={sortTextStyle}>SORT BY</Text>
        </View>
        <View style={listingsWrapperStyle}>
          <FlatList
            data={listings}
            renderItem={({item}) => this.renderMyListings(item)}
            keyExtractor={listing => listing.isbn}
          />
        </View>
      </View>
    );
  }
}
