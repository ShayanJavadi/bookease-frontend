import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, ActivityIndicator } from "react-native";
import { func, bool, shape, array } from "prop-types";
import {
  Camera,
} from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import { styles, palette } from "./styles";
import { FLASH_OPTIONS_ORDER } from "./consts";
import Toast from "react-native-easy-toast"

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  flashIconWrapperStyle,
  captureButtonWrapperStyle,
  captureButtonOuterStyle,
  captureButtonInnerStyle,
  topRowWrapperStyle,
  bottomRowWrapperStyle
} = styles;

const {
  tertiaryColorDark,
} = palette;

export default class EnterBookDetailsCameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Take images copy goes here",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  static propTypes = {
    createImagesFolder: func.isRequired,
    takePicture: func.isRequired,
    updateImages: func.isRequired,
    images: array.isRequired,
    loading: bool,
    isTakingPicture: bool.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
  }

  state = {
    flash: "off",
  }

  componentDidMount() {
    this.props.createImagesFolder();
    this.props.updateImages();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.isTakingPicture && !nextProps.isTakingPicture) {
      this.refs.toast.show("Image added");
    }
  }

  toggleFlash() {
    this.setState({
      flash: FLASH_OPTIONS_ORDER[this.state.flash],
    });
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

  renderImagesThumbnail() {
    const { navigation } = this.props;
    return (
      <View style={{ justifyContent: "flex-start", marginBottom: 30, marginLeft: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Badge
            text={`${this.props.images ? this.props.images.length : 0}`}
            style={{ container: { flex: 1, right: 0 } }}
            size={20}
          >
            <MaterialIcons name="insert-photo" size={45} style={{ color: "#fff" }}/>
          </Badge>
        </TouchableOpacity>
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

  renderToastMessage() {
    return (
      <Toast
        ref="toast"
        opacity={0.8}
        style={{ backgroundColor: "#ff003d" }}
        position="bottom"
        positionValue={80}
        fadeInDuration={750}
        fadeOutDuration={1000}
      />
    )
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator
            size="large"
            color={tertiaryColorDark}
          />
        </View>
      )
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
            {this.renderImagesThumbnail()}
            {this.renderCaptureButton()}
          </View>
            {this.renderToastMessage()}
        </Camera>
      </View>
    );
  }
}
