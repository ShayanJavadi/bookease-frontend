import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles, ICON_SIZE} from './styles';
import { Button } from 'react-native-elements';

const {
  buttonStyle,
  buttonTextStyle,
  slideTextStyle,
  slideStyle,
  slideLogoStyle,
  slideDotsStyle
} = styles;

export default class Slides extends Component {
  renderBottomIcon(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          raised
          large
          onPress={this.props.onComplete}
          buttonStyle={buttonStyle}
          textStyle={buttonTextStyle}
          title={`Get Started`}
        />
      )
    }
    return <Entypo name="dots-three-horizontal" size={ICON_SIZE} style={slideDotsStyle} />;
  }
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View  key={slide.text} style={[slideStyle, { backgroundColor: slide.color }]}>
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
      )
    });
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
