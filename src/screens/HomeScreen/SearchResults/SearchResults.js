import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { object, bool, array } from "prop-types";
import { isEmpty, isEqual } from "lodash";
import Masonry from "react-native-masonry";
import uiTheme from "src/common/styles/uiTheme";
import Chip from "src/modules/Chip";
import ProgressiveImage from "src/modules/ProgressiveImage";

class SearchResults extends React.PureComponent {
  state = {
    bricks: [],
    textbooks: [],
  }

  getBricks = (textbooks) => {
    const { navigation } = this.props;
    if (!isEmpty(textbooks)) {
      const bricks = textbooks.reduce((textbookImages, textbook) => {
        const uri = textbook.images[0] && textbook.images[0].thumbnail;
        const onPress = textbook => navigation.navigate("singleBook", { textbookId: textbook.id });
        const renderFooter = textbook => <Chip text={`\$${textbook.price}`} />
      
        return [...textbookImages, { data: textbook, uri, onPress, renderFooter }]
      }, []);

      this.setState({ bricks: bricks, textbooks: textbooks });
    }
  }

  componentWillReceiveProps(nextProps) {
    // fixes issue with bricks getting duplicated
    if (!isEqual(nextProps.textbooks, this.state.textbooks)) {
      this.getBricks(nextProps.textbooks);
    }
  }

  render() {
    const { textbooks, loading } = this.props;
    if (loading) {
      return (
        <View style={{ flex: 7, backgroundColor: "#fafafa" }}>
          <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
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
        <View style={{ flex: 7, backgroundColor: "#fafafa" }}>
          <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
            <Text>No results found</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{ flex: 7 }}>
        <Masonry
          columns={textbooks.length < 3 ? 2 : 3} // optional - Default: 2
          bricks={this.state.bricks}
          customImageComponent={ProgressiveImage}
          imageContainerStyle={{
            borderWidth: .5,
            borderColor: "#eee",
          }}
        />
      </View>
    );
  }
}

SearchResults.propTypes = {
  navigation: object.isRequired,
  loading: bool.isRequired,
  textbooks: array.isRequired,
};

export default SearchResults;
