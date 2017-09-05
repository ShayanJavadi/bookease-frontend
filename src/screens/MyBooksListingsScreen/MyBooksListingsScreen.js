import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Swipeable from 'react-native-swipeable';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { styles, SWIPE_OUT_ICON_SIZE } from "./styles";

const {
  screenStyle,
  sortWrapperStyle,
  sortTextStyle,
  listingsWrapperStyle,
  listingWrapperStyle,
  listingDetailsWrapperStyle,
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
  listingAuthorTextStyle,
  swipeOutStyle,
  swipeOutTextStyle,
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
    status: "Active",
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
    status: "Sold",
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
    status: "Sold",
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
      author,
    } = listing;

    return (
      <Swipeable
        rightButtons={[
          <TouchableOpacity style={[swipeOutStyle, { backgroundColor: '#00BFA5' }]}>
            <MaterialIcons
              name="edit"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
          <TouchableOpacity style={[swipeOutStyle, {backgroundColor: '#ff003d'}]}>
          <MaterialCommunityIcons
            name="delete"
            size={SWIPE_OUT_ICON_SIZE}
            style={swipeOutTextStyle}
          />
          </TouchableOpacity>
        ]}
      >
        <View style={listingWrapperStyle}>
          <View style={listingDetailsWrapperStyle}>
            <View style={listingNameWrapperStyle}>
              <Text style={listingNameTextStyle}>{name}</Text>
            </View>
            <View style={listingDetailsTopWrapperStyle}>
              <Text style={[listingSmallDetailsTextStyle, listingStatusTextStyle]}>Status: {status}</Text>
              <Text style={[listingSmallDetailsTextStyle, listingAuthorTextStyle]}>Author: {author}</Text>
            </View>
            <View style={listingDetailsBottomWrapperStyle}>
              <Text style={[listingSmallDetailsTextStyle, listingConditionTextStyle]}>Condition: {condition}</Text>
              <Text style={[listingSmallDetailsTextStyle, listingIsbnTextStyle]}>Isbn: {isbn}</Text>
            </View>
            <View style={listingDateWrapperStyle}>
              <Text style={listingDateTextStyle}>{timePosted}</Text>
            </View>
          </View>
          <View style={listingPriceWrapperStyle}>
            <Text style={listingPriceTextStyle}>${price}</Text>
          </View>
        </View>
      </Swipeable>
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
            renderItem={({ item }) => this.renderMyListings(item)}
            keyExtractor={listing => listing.isbn}
          />
        </View>
      </View>
    );
  }
}
