import React, { Component } from "react";
import { View, Image, Animated, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo";
import { string, object } from "prop-types";
import getImagePreviewUri from "src/common/lib/getImagePreviewUri";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class ProgressiveImage extends Component {
  static propTypes = {
    uri: string,
    preview: string,
    imageStyle: object,
    containerStyle: object,
    source: object,
    style: object,
  };

  state = {
    intensity: new Animated.Value(0)
  }

  async UNSAFE_componentWillMount() {
    const injectedPropsByMasonry = this.props.source;
    const uri = injectedPropsByMasonry ? injectedPropsByMasonry.uri : this.props.uri;

    this.setState({ uri: getImagePreviewUri(uri), intensity: new Animated.Value(100) });
    await Image.prefetch(uri);
  }

  onLoadEnd() {
    const injectedPropsByMasonry = this.props.source;
    const uri = injectedPropsByMasonry ? injectedPropsByMasonry.uri : this.props.uri;
    this.setState({ uri }, () => {
      const intensity = new Animated.Value(100);
      this.setState({ intensity });
      Animated.timing(intensity, { duration: 500, toValue: 0 }).start();
    })
  }

  onPartialLoadEnd() {
    const injectedPropsByMasonry = this.props.source;
    const uri = injectedPropsByMasonry ? injectedPropsByMasonry.uri : this.props.uri;
    this.setState({ uri }, () => {
      const intensity = new Animated.Value(100);
      this.setState({ intensity });
      Animated.timing(intensity, { duration: 500, toValue: 5 }).start();
    })
  }

  render() {
    const { containerStyle, imageStyle } = this.props;
    const { uri } = this.state;
    const masonaryStyleProps = this.props.source && this.props.style;
    const computedStyle = [
        StyleSheet.absoluteFill,
        containerStyle
    ];

    return (
        <View style={[containerStyle, { backgroundColor: "#f1f1f1" }]}>
            {
                uri && (
                    <Image
                        source={{ uri }}
                        style={[imageStyle, masonaryStyleProps]}
                        onLoadEnd={() => this.onLoadEnd()}
                    />
                )
            }
            {
                Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} intensity={this.state.intensity} />
            }
        </View>
    );
  }
}
