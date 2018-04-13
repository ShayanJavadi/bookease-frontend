import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { func, bool, object } from "prop-types";
import { styles } from "./styles";

const {
  screenStyle,
  activitySpinnerStyle,
} = styles;

export default class ProfilePictureCameraScreen extends Component {
  static propTypes = {
    selectImage: func.isRequired,
    updateUser: func.isRequired,
    mutate: func.isRequired,
    navigation: object.isRequired,
    isImageGalleryOpen: bool.isRequired,
    isUploading: bool.isRequired,
    currentUser: object.isRequired,
  }

  state = {
    isNavigatingAway: false,
  }

  componentWillReceiveProps(nextProps) {
    const { isImageGalleryOpen, navigation } = nextProps;

    if (!isImageGalleryOpen && !this.state.isNavigatingAway) {
      this.setState({ isNavigatingAway: true });

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
      updatePhotoUrl: this.props.mutate,
      updateUserData: this.props.updateUser,
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
         {this.props.isUploading ? <Text>Uploading...</Text> : <Text>Please wait...</Text>}
      </View>
    )
  }
}
