import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { func, bool, object } from "prop-types";
import { styles } from "./styles";

const {
  screenStyle,
  activitySpinnerStyle,
} = styles;

export default class ProfilePictureCameraScreen extends Component {
  static propTypes = {
    selectImage: func.isRequired,
    isImageGalleryOpen: bool.isRequired,
    currentUser: object,
  }

  componentWillReceiveProps(nextProps) {
    const { isImageGalleryOpen, navigation } = nextProps;

    if (!isImageGalleryOpen) {
      const { nextScreenSequence } = navigation.state.params;
      const newNextScreenSequence = nextScreenSequence.slice(1);
      const nextScreen = nextScreenSequence[0];

      navigation.navigate(nextScreen, {
        nextScreenSequence: newNextScreenSequence,
      });
    }
  }

  componentWillMount() {
    this.props.selectImage({
      currentUser: this.props.currentUser,
    });
  }

  render() {
    return (
      <View style={screenStyle}>
        <ActivityIndicator
           animating={true}
           style={[styles.centering, activitySpinnerStyle]}
           size="large"
         />
      </View>
    )
  }
}
