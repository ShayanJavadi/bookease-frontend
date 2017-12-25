import React from "react";
import { Text, View } from "react-native";
import { object } from "prop-types";
import { toOrdinal, mapNumberToConditions } from "src/common/lib";
import { styles } from "./styles";

const {
  bookDetailsWrapperStyle,
  bookDetailsTitleWrapperStyle,
  bookDetailsTitleStyle,
  bookDetailsTextWrapperStyle,
  bookDetailsTextKeyStyle,
  bookDetailsTextValueStyle,
} = styles;

const BookDetails = ({ textbook: { title, condition, authors, industryIdentifiers, edition } }) => {
  return (
    <View style={bookDetailsWrapperStyle}>
      <View style={{ flex: 2 }}>
        <View style={bookDetailsTitleWrapperStyle}>
            <View style={{ flexDirection: "row" }}>
              <Text style={bookDetailsTitleStyle}>{title}</Text>
            </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={bookDetailsTextKeyStyle}>Condition: </Text>
            <Text style={bookDetailsTextValueStyle}>{mapNumberToConditions(condition)}</Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>Author: </Text>
            <Text style={bookDetailsTextValueStyle}>{authors}</Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>Edition: </Text>
            <Text style={bookDetailsTextValueStyle}>{toOrdinal(edition)}</Text>
          </View>
        </View>
        <View style={bookDetailsTextWrapperStyle}>
          <View style={{ flexDirection: "row"  }}>
            <Text style={bookDetailsTextKeyStyle}>ISBN: </Text>
            <Text style={bookDetailsTextValueStyle}>{industryIdentifiers[0].identifier}</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

BookDetails.propTypes = {
  textbook: object.isRequired,
};

export default BookDetails;
