import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { arrayOf, string, shape, func } from "prop-types";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-material-ui";
import { styles, ICON_SIZE } from "./styles";

const {
  buttonTextStyle,
  slideTextStyle,
  slideStyle,
  slideLogoStyle,
  slideDotsStyle,
} = styles;

export default class Slides extends Component {
  static propTypes = {
    data: arrayOf(shape({
      text: string,
      color: string,
    })).isRequired,
    onComplete: func.isRequired
  };

  renderBottomIcon(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          raised
          primary
          style={{ text: buttonTextStyle }}
          text="I'm ready!"
          onPress={this.props.onComplete}
        />
      );
    }
    return <Entypo name="dots-three-horizontal" size={ICON_SIZE} style={slideDotsStyle} />;
  }
  renderSlides() {
    return this.props.data.map((slide, index) => (
      <View key={slide.text} style={[slideStyle, { backgroundColor: slide.color }]}>
        <View>
          <Entypo name="book" size={ICON_SIZE} style={slideLogoStyle} />
        </View>
        <View>
          <Text style={slideTextStyle}>{slide.text}</Text>
        </View>
        <View>
          {this.renderBottomIcon(index)}
        </View>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}
