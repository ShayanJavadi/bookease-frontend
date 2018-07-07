import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, ActivityIndicator, Image, Text } from "react-native";
import { func, bool, shape, object } from "prop-types";
import { Camera } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "src/modules/BackButton";
import Modal from "src/modules/Modal";
import { styles, palette } from "./styles";
import { FLASH_OPTIONS_ORDER } from "./consts";
import { default as externalUploadImage } from "src/common/lib/uploadImage";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  flashIconWrapperStyle,
  captureButtonWrapperStyle,
  captureButtonOuterStyle,
  captureButtonInnerStyle,
  topRowWrapperStyle,
  bottomRowWrapperStyle,
  imagePreviewStyle,
  activitySpinnerStyle,
} = styles;

const {
  tertiaryColorDark,
} = palette;

export default class ProfilePictureCameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Take a New Profile Picture",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  static propTypes = {
    takePicture: func.isRequired,
    setStoredUser: func.isRequired,
    mutate: func.isRequired,
    imageUri: object,
    loading: bool.isRequired,
    isTakingPicture: bool.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    currentStoredUser: object.isRequired,
  }

  state = {
    flash: "off",
    isInConfirmationDialog: false,
    isUploading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUri !== undefined) {
      this.setState({ isInConfirmationDialog: true });
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  toggleFlash() {
    this.setState({
      flash: FLASH_OPTIONS_ORDER[this.state.flash],
    });
  }

  async uploadImage() {
    const { imageUri, currentStoredUser, navigation } = this.props;

    this.setState({
      isInConfirmationDialog: false,
      isUploading: true
    });

    const uploadedImageUrl = await externalUploadImage(imageUri);
    const newProfileData = Object.assign({}, currentStoredUser);
    newProfileData.photoURL = uploadedImageUrl;

    await this.props.mutate({
      variables: {
        phoneNumber: currentStoredUser.phoneNumber,
        photoUrl: uploadedImageUrl,
      }
    });

    await this.props.setStoredUser(newProfileData);

    this.setState({ isUploading: false });

    const { nextScreenSequence } = navigation.state.params;
    const newNextScreenSequence = nextScreenSequence.slice(1);
    const nextScreen = nextScreenSequence[0];

    navigation.navigate(nextScreen, {
      nextScreenSequence: newNextScreenSequence,
    });
  }

  render() {
    const { isTakingPicture } = this.props;
    const { isInConfirmationDialog, isUploading } = this.state;

    if (isTakingPicture || isInConfirmationDialog || isUploading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          {isInConfirmationDialog && this.renderConfirmationModal()}
          <ActivityIndicator
            size="large"
            color={tertiaryColorDark}
            style={activitySpinnerStyle}
          />
          {isUploading && (<Text>Uploading...</Text>)}
        </View>
      );
    }

    return (
      <View style={screenStyle}>
        <Camera
          style={{ flex: 1 }}
          ref={ref => { this.camera = ref; }}
          flashMode={this.state.flash}
          autoFocus="on"
        >
          <View style={topRowWrapperStyle}>
            {this.renderFlashIcon()}
          </View>
          <View style={bottomRowWrapperStyle}>
            {this.renderCaptureButton()}
          </View>
        </Camera>
      </View>
    );
  }

  renderConfirmationModal() {
    return (
      <Modal
        isVisible={this.state.isInConfirmationDialog}
        text="Use this picture?"
        actions={["No", "Yes"]}
        onActionPress={async () => await this.uploadImage()}
      >
        <Image
          source={{ uri: this.props.imageUri }}
          style={imagePreviewStyle}
        />
      </Modal>
    )
  }

  renderFlashIcon() {
    const { flash } = this.state;

    return (
      <View style={flashIconWrapperStyle}>
        <TouchableHighlight
          onPress={() => this.toggleFlash()}
        >
          <MaterialIcons name={`flash-${flash}`} size={flash === "auto" ? 28 : 30} style={{
            color: "#fff",
            paddingLeft: flash === "auto" ? 5 : undefined
          }}/>
        </TouchableHighlight>
      </View>
    )
  }

  renderCaptureButton() {
    return (
      <View style={captureButtonWrapperStyle}>
        <View style={captureButtonOuterStyle}>
            <TouchableOpacity
              style={captureButtonInnerStyle}
              onPress={() => !this.props.loading ? this.props.takePicture(this.camera, this.props.navigation) : null}
            />
        </View>
      </View>
    )
  }
}
