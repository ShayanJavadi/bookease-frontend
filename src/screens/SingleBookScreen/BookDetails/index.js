import React from "react";
import { Text, View } from "react-native";
import { object } from "prop-types";
import { styles } from "./styles";

const {
  bookDetailsWrapperStyle,
  bookDetailsTitleWrapperStyle,
  bookDetailsTitleStyle,
  bookDetailsTextWrapperStyle,
  bookDetailsTextKeyStyle,
  bookDetailsTextValueStyle,
} = styles;

const BookDetails = ({ textbook: { name, author, condition, isbn, edition } }) => (

  <View style={bookDetailsWrapperStyle}>
    <View style={{ flex: 2 }}>
      <View style={bookDetailsTitleWrapperStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={bookDetailsTitleStyle}>{name}</Text>
          </View>
      </View>
      <View style={bookDetailsTextWrapperStyle}>
        <View style={{ flexDirection: "row" }}>
          <Text style={bookDetailsTextKeyStyle}>Condition: </Text>
          <Text style={bookDetailsTextValueStyle}>{condition}</Text>
        </View>
      </View>
      <View style={bookDetailsTextWrapperStyle}>
        <View style={{ flexDirection: "row"  }}>
          <Text style={bookDetailsTextKeyStyle}>Author: </Text>
          <Text style={bookDetailsTextValueStyle}>{author}</Text>
        </View>
      </View>
      <View style={bookDetailsTextWrapperStyle}>
        <View style={{ flexDirection: "row"  }}>
          <Text style={bookDetailsTextKeyStyle}>Edition: </Text>
          <Text style={bookDetailsTextValueStyle}>{edition}</Text>
        </View>
      </View>
      <View style={bookDetailsTextWrapperStyle}>
        <View style={{ flexDirection: "row"  }}>
          <Text style={bookDetailsTextKeyStyle}>ISBN: </Text>
          <Text style={bookDetailsTextValueStyle}>{isbn}</Text>
        </View>
      </View>
    </View>
  </View>
);

BookDetails.propTypes = {
  textbook: object.isRequired,
};

export default BookDetails;
