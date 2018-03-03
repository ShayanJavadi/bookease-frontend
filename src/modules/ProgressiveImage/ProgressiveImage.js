import React, { Component } from "react";
import { View, Image, Animated, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo";
import { string, object } from "prop-types";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class ProgressiveImage extends Component {
  static propTypes = {
    uri: string,
    preview: string,
    imageStyle: object,
    containerStyle: object,
  };

  async componentWillMount() {
    const { preview, uri } = this.props;
    this.setState({ uri: preview, intensity: new Animated.Value(100) });
    await Image.prefetch(uri);
  }

  onLoadEnd() {
    const { uri } = this.props;
    this.setState({ uri }, () => {
      const intensity = new Animated.Value(100);
      this.setState({ intensity });
      Animated.timing(intensity, { duration: 500, toValue: 0, useNativeDriver: true }).start();
    })
  }

  onPartialLoadEnd() {
    const { uri } = this.props;
    this.setState({ uri }, () => {
      const intensity = new Animated.Value(100);
      this.setState({ intensity });
      Animated.timing(intensity, { duration: 500, toValue: 10, useNativeDriver: true }).start();
    })
  }

  render() {
    const { containerStyle, imageStyle } = this.props;
    const { uri, intensity } = this.state;
    const computedStyle = [
        StyleSheet.absoluteFill,
        containerStyle
    ];

    return (
        <View style={containerStyle}>
            {
                uri && (
                    <Image
                        source={{ uri }}
                        style={imageStyle}
                        onLoadEnd={() => this.onLoadEnd()}
                        onPartialLoad={() => this.onPartialLoadEnd()}
                    />
                )
            }
            {
                Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} intensity={intensity} />
            }
        </View>
    );
  }
}
