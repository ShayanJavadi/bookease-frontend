import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, ActivityIndicator, Image } from "react-native";
import { func, bool, shape, array, object } from "prop-types";
import {
  Camera,
} from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import Modal from "src/modules/Modal";
import { styles, palette } from "./styles";
import { FLASH_OPTIONS_ORDER } from "./consts";

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
    image: object,
    isTakingPicture: bool.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  }

  state = {
    flash: "off",
    isInConfirmationDialog: false,
  }

  componentWillReceiveProps(nextProps) {
    const { image } = nextProps;

    if (this.props.isTakingPicture && !nextProps.isTakingPicture) {
        this.setState({ isInConfirmationDialog: true });
    }
  }

  toggleFlash() {
    this.setState({
      flash: FLASH_OPTIONS_ORDER[this.state.flash],
    });
  }

  renderConfirmationModal() {
    return (
      <Modal
        isVisible={this.state.isInConfirmationDialog}
        text="Use this picture?"
        actions={["No", "Yes"]}
        onActionPress={() => this.setState({ isInConfirmationDialog: false })}
      >
        <Image
          source={this.props.image}
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

  render() {
    if (this.props.isTakingPicture) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator
            size="large"
            color={tertiaryColorDark}
          />
        </View>
      );
    }

    if (this.state.isInConfirmationDialog) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          {this.renderConfirmationModal()}
          <ActivityIndicator
            size="large"
            color={tertiaryColorDark}
          />
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
}
