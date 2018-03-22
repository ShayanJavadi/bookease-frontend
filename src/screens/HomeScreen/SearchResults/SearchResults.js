import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { object, bool, array } from "prop-types";
import { isEmpty } from "lodash";
import Masonry from "react-native-masonry";
import uiTheme from "src/common/styles/uiTheme";
import Chip from "src/modules/Chip";
import ProgressiveImage from "src/modules/ProgressiveImage";

const getBricks = (textbooks, navigation) => {
  return textbooks.reduce((textbookImages, textbook) => {
    const uri = textbook.images[0] && textbook.images[0].thumbnail;
    const onPress = textbook => navigation.navigate("singleBook", { textbookId: textbook.id });
    const renderFooter = textbook => <Chip text={`\$${textbook.price}`} />

    return [ ... textbookImages, { data: textbook, uri, onPress,renderFooter } ]
  }, [])
}

const SearchResults = ({ textbooks, loading, navigation }) => {
  if (loading) {
    return (
      <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
        <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
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
      <View style={{ flex: 6, backgroundColor: "#fafafa" }}>
        <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
          <Text>No results found</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 6 }}>
      <Masonry
        columns={textbooks.length < 3 ? 2 : 3} // optional - Default: 2
        bricks={getBricks(textbooks, navigation)}
        customImageComponent={ProgressiveImage}
        imageContainerStyle={{
          borderWidth: .5,
          borderColor: "#eee",
        }}
      />
    </View>
  );
}

SearchResults.propTypes = {
  navigation: object.isRequired,
  loading: bool.isRequired,
  textbooks: array.isRequired,
};

export default SearchResults;
