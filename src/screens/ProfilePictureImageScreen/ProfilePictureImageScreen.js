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
    setStoredUser: func.isRequired,
    mutate: func.isRequired,
    navigation: object.isRequired,
    isImageGalleryOpen: bool.isRequired,
    isUploading: bool.isRequired,
    currentStoredUser: object.isRequired,
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
      currentStoredUser: this.props.currentStoredUser,
      updatePhotoUrl: this.props.mutate,
      setStoredUserData: this.props.setStoredUser,
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
