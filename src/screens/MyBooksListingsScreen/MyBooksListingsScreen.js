import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { func, shape, object } from "prop-types";
import { isEmpty } from "lodash";
import { Button } from "react-native-material-ui";
import Swipeable from "react-native-swipeable";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Modal from "src/modules/Modal";
import { toOrdinal, getRelativeTime } from "src/common/lib";
import { styles, SWIPE_OUT_ICON_SIZE, NO_LISTING_ICON_COLOR, palette } from "./styles";

const {
  tertiaryColorDark,
} = palette;

const {
  screenStyle,
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
  swipeOutStyle,
  swipeOutTextStyle,
  noListingWrapperStyle,
  noListingIconWrapperStyle,
  noListingTextStyle,
  activityIndicatorWrapper,
} = styles;

export default class MyBooksListingsScreen extends Component {
  static propTypes = {
    data: object.isRequired,
    getMyTextbooksQuery: func.isRequired,
    deleteTextbookMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  state = {
    refreshing: false,
    isDeleteConfirmationModalVisible: false,
    selectedTextbookId: "",
  }

  onScrollViewRefresh() {
    this.setState({ refreshing: true });
    this.props.getMyTextbooksQuery.refetch()
    .then(() => {
      this.setState({ refreshing: false });
    })
  }

  onDeleteButtonPress(id = "") {
    this.setState({
      selectedTextbookId: id,
      isDeleteConfirmationModalVisible: true,
    })
  }

  onEditButtonPress(id = "") {
    this.props.navigation.navigate("sellBooks", { textbookIdToUpdate: id });
  }

  onModalActionPress(action) {
   const { deleteTextbookMutation, getMyTextbooksQuery } = this.props;

   if (action === "erase") {
     deleteTextbookMutation({
       variables: {
         textbookId: this.state.selectedTextbookId
       }
     })
     .then(() => {
       this.setState({ isDeleteConfirmationModalVisible: false })
       getMyTextbooksQuery.refetch();
     })
   }

   this.setState({ isDeleteConfirmationModalVisible: false })
 }

  renderMyListings(listing) {
    const {
      title,
      edition,
      createdAt,
      price,
      authors,
      images,
      id,
    } = listing;

    return (
      <Swipeable
        rightButtons={[
          <TouchableOpacity
            style={[swipeOutStyle, { backgroundColor: "#00BFA5" }]}
            key="edit"
            onPress={() => this.onEditButtonPress(id)}
          >
            <MaterialIcons
              name="edit"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
          <TouchableOpacity
            style={[swipeOutStyle, { backgroundColor: "#ff003d" }]} key="delete"
            onPress={() => this.onDeleteButtonPress(id)}
          >
            <MaterialCommunityIcons
              name="delete"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
        ]}
      >
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("singleBook", { textbookId: id })}>
          <View style={listingWrapperStyle}>
            <View style={listingPictureWrapperStyle}>
              <Image
                style={listingPictureStyle}
                source={{ uri: images[0].thumbnail }}
              />
            </View>
            <View style={listingDetailsWrapperStyle}>
              <View style={listingNameWrapperStyle}>
                <Text style={listingNameTextStyle}>{title}<Text style={{ color: "#444" }}> - {toOrdinal(edition)}</Text></Text>
              </View>
              <View style={listingDetailsTopWrapperStyle}>
                <Text style={[listingSmallDetailsTextStyle, ]}>
                  <Text style={{ fontWeight: "400" }}>Author:</Text> {authors}
                </Text>
              </View>
              <View style={listingDetailsBottomWrapperStyle}>
                <Text style={[listingSmallDetailsTextStyle, listingStatusTextStyle]}>
                  <Text style={{ fontWeight: "400" }}>Status:</Text> Active
                </Text>
              </View>
              <View style={listingDateWrapperStyle}>
                <Text style={listingDateTextStyle}>{getRelativeTime(createdAt)}</Text>
              </View>
            </View>
            <View style={listingPriceWrapperStyle}>
              <Text style={listingPriceTextStyle}>${price}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    );
  }

  renderListings() {
    const { loading, getMyTextbooks } = this.props.getMyTextbooksQuery;

    if (loading) {
      return (
        <View style={activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )
    }

    if (isEmpty(getMyTextbooks)) {
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
            <Text style={noListingTextStyle}>{"You don't have any books for sale."}</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Button
              primary
              raised
              text="Sell Book"
              onPress={() => this.props.navigation.navigate("scanBook")}
            />
          </View>
        </View>
      )
    }

    return (
      <View style={listingsWrapperStyle}>
        <FlatList
          data={getMyTextbooks}
          renderItem={({ item }) => this.renderMyListings(item)}
          keyExtractor={getMyTextbooks => getMyTextbooks.id}
        />
      </View>
    )
  }

  renderDeleteConfirmationModal() {
    return (
      <Modal
        isVisible={this.state.isDeleteConfirmationModalVisible}
        text="Discard selected Textbook?"
        textStyle={{ fontSize: 18 }}
        actions={["cancel", "erase"]}
        onActionPress={(action) => this.onModalActionPress(action)}
      />
    )
  }

  render() {
    return (
      <View style={screenStyle}>
        <ScrollView style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onScrollViewRefresh()}
              tintColor={tertiaryColorDark}
            />
          }
        >
        {this.renderListings()}
        </ ScrollView>
        {this.renderDeleteConfirmationModal()}
      </View>
    );
  }
}
