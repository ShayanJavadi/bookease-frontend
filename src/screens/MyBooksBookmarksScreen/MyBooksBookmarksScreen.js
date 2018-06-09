import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { func, shape } from "prop-types";
import { isEmpty } from "lodash";
import { Button } from "react-native-material-ui";
import Swipeable from "react-native-swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookListingDetails from "src/modules/BookListingDetails";
import { styles, SWIPE_OUT_ICON_SIZE, NO_BOOKMARKS_ICON_COLOR, palette } from "./styles";

const {
  tertiaryColorDark,
} = palette;

const { 
  screenStyle,
  activityIndicatorWrapperStyle,
  bookmarksWrapperStyle,
  swipeOutStyle,
  swipeOutTextStyle,
  noBookmarksWrapperStyle,
  noBookmarksIconWrapperStyle,
  noBookmarksTextStyle,
} = styles;

export default class MyBooksBookmarksScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    getMyBookmarksQuery: func.isRequired,
    deleteBookmarkMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  };

  state = {
    refreshing: false,
    isDeletingBookmark: false,
    hasStaleData: true,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.navigation.isFocused()) {
      this.setState({ hasStaleData: true })
    }
    if (nextProps.navigation.isFocused() && this.state.hasStaleData) {
      this.props.getMyBookmarksQuery.refetch()
      .then(() => {
        this.setState({ hasStaleData: false });
      })
    }
  }
  
  onScrollViewRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getMyBookmarksQuery.refetch()
    .then(() => {
      this.setState({ refreshing: false });
    })
  }

  onUnfavoriteButtonPress = (id) => {
    this.setState({ isDeletingBookmark: true });
    this.props.deleteBookmarkMutation({
      variables: {
        bookmark: {
          textbookId: id,
        }
      }
    })
    .then(() => {
      this.setState({ isDeletingBookmark: false });
      this.props.getMyBookmarksQuery.refetch();
    })
  }


  renderMyBookmarks({ textbook }) {
    const {
      id,
    } = textbook;
    const { navigation } = this.props;

    return (
      <Swipeable
        rightButtons={[
          <TouchableOpacity
            style={[swipeOutStyle, { backgroundColor: tertiaryColorDark }]}
            key="remove"
            onPress={() => this.onUnfavoriteButtonPress(id)}
          >
            <MaterialCommunityIcons
              name="heart-off"
              size={SWIPE_OUT_ICON_SIZE}
              style={swipeOutTextStyle}
            />
          </TouchableOpacity>,
        ]}
      >
        <BookListingDetails
          listing={textbook}
          onPress={() => navigation.navigate("singleBook", { textbookId: id })}
          navigation={navigation}
        />
      </Swipeable>
    );
  }

  renderBookmarks = () => {
    const { loading, getMyBookmarks } = this.props.getMyBookmarksQuery;
    if (loading) {
      return (
        <View style={activityIndicatorWrapperStyle}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )
    }

    if (isEmpty(getMyBookmarks)) {
      return (
        <View style={noBookmarksWrapperStyle}>
          <View style={noBookmarksIconWrapperStyle}>
            <MaterialCommunityIcons
              name="heart"
              size={40}
              color={NO_BOOKMARKS_ICON_COLOR}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={noBookmarksTextStyle}>{"Your bookmarks will appear here."}</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Button
              primary
              raised
              text="Search Books"
              onPress={() => this.props.navigation.navigate("home")}
            />
          </View>
        </View>
      )
    }

    return (
      <View style={bookmarksWrapperStyle}>
        <FlatList
          data={getMyBookmarks}
          renderItem={({ item }) => this.renderMyBookmarks(item)}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  render() {
    // you haven't bookmarked anything
    // search books
    return (
      <View style={screenStyle}>
        <ScrollView style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onScrollViewRefresh}
              tintColor={tertiaryColorDark}
            />
          }
        >
        {this.renderBookmarks()}
        </ ScrollView>
      </View>
    );
  }
}
