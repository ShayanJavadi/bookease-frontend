import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";
import { BlurView } from "expo";
import Swipeable from "react-native-swipeable";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { styles, SWIPE_OUT_ICON_SIZE, NO_LISTING_ICON_COLOR } from "./styles";

const {
  screenStyle,
  sortWrapperStyle,
  sortTextStyle,
  listingPictureWrapperStyle,
  listingPictureStyle,
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
  listingStatusTextStyle,
  listingAuthorTextStyle,
  swipeOutStyle,
  swipeOutTextStyle,
  noListingWrapperStyle,
  noListingIconWrapperStyle,
  noListingTextStyle,
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
    thumbnail: "http://i.ebayimg.com/images/g/wqEAAOSwsXFZIheF/s-l1600.jpg",
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
    thumbnail: "http://i.ebayimg.com/images/g/~HcAAOSwl1xZp0yu/s-l1600.jpg",
  }, {
    name: "Modern Webapps with COBOL and Fortran",
    edition: "12th",
    condition: "Fair",
    isbn: "9782391833312312377",
    owner: "Some Guy",
    university: "University of North Texas",
    price: "100",
    timePosted: "2w",
    author: "Miller Levine",
    status: "Sold",
    thumbnail: "http://i.ebayimg.com/images/g/X~YAAOSwqYZZp0QO/s-l1600.jpg",
  },
];

export default class MyBooksListingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  renderMyListings(listing) {
    const {
      name,
      edition,
      condition,
      isbn,
      // owner,
      timePosted,
      price,
      status,
      author,
      thumbnail,
    } = listing;

    return (

      <Swipeable
        rightButtons={[
          <TouchableOpacity style={[swipeOutStyle, { backgroundColor: "#00BFA5" }]} key="edit">
            <MaterialIcons
              name="edit"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
          <TouchableOpacity style={[swipeOutStyle, { backgroundColor: "#ff003d" }]} key="delete">
            <MaterialCommunityIcons
              name="delete"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
        ]}
      >

        <View style={listingWrapperStyle}>
          <View style={listingPictureWrapperStyle}>

            <Image
              style={listingPictureStyle}
              source={{ uri:thumbnail }}
            />
          </View>
          <View style={listingDetailsWrapperStyle}>
            <View style={listingNameWrapperStyle}>
              <Text style={listingNameTextStyle}>{name}<Text style={{ color: "#444"}}> - {edition}</Text></Text>
            </View>
            <View style={listingDetailsTopWrapperStyle}>
              <Text style={[listingSmallDetailsTextStyle, ]}>
                <Text style={{ fontWeight: "400" }}>Author:</Text> {author}
              </Text>

            </View>
            <View style={listingDetailsBottomWrapperStyle}>
              <Text style={[listingSmallDetailsTextStyle, listingStatusTextStyle]}>
                <Text style={{ fontWeight: "400" }}>Status:</Text> {status}
              </Text>
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

  renderListings() {
    if (listings) {
      return (
        <View style={listingsWrapperStyle}>
          <FlatList
            data={listings}
            renderItem={({ item }) => this.renderMyListings(item)}
            keyExtractor={listing => listing.isbn}
          />
        </View>
      )
    }

    return (
      <View style={noListingWrapperStyle}>
        <View style={noListingIconWrapperStyle}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={40}
            color={NO_LISTING_ICON_COLOR}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={noListingTextStyle}>{"You have no items posted.\n Tap below to post one!"}</Text>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Button
            primary
            raised
            text="Post Item"
            onPress={() => this.props.navigation.navigate("scanBook")}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={screenStyle}>
        {this.renderListings()}
      </View>
    );
  }
}
