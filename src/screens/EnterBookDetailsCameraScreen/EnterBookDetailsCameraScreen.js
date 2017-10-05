import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo';
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Badge } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";
import { FLASH_OPTIONS_ORDER } from './consts';

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

export default class EnterBookDetailsCameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Take photos copy goes here",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  state = {
    flash: 'off',
    ready: false,
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos')
      .then(() => {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos')
        .then(() => {
          this.setState({ ready: true });
        })
      })
    });
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

  sendPhotosToForm() {
    this.props.navigation.navigate("enterBookDetails", { photos: this.props.photos } )
  }

  renderPhotosThumbnail() {
    return (
      <View style={{ justifyContent: "flex-start", marginBottom: 30, marginLeft: 15}}>
        <TouchableOpacity onPress={() => this.sendPhotosToForm()}>
          <Badge
            text={`${this.props.photos.length}`}
            style={{ container: { flex: 1, right: 0}}}
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
              onPress={() => this.state.ready ? this.props.takePicture(this.camera, this.props.navigation) : null}
            />
        </View>
      </View>
    )
  }

  render() {
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
            {this.renderPhotosThumbnail()}
            {this.renderCaptureButton()}
          </View>
        </Camera>
      </View>
    );
  }
}
