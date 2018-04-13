import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import ActionButton from "react-native-action-button";
import { NavigationActions } from "react-navigation";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { func, object, shape } from "prop-types";
import Modal from "src/modules/Modal";
import Avatar from "src/modules/Avatar";
import { styles, palette, ICON_SIZE, AVATAR_SIZE } from "./styles";

const {
  headerStyle,
  headerTitleStyle,
  screenStyle,
  contentContainerStyle,
  avatarActionButtonStyle,
  avatarContainerStyle,
  inputGroupStyle,
  inputContainerStyle,
  inputStyle,
  editIconStyle,
  signOutButtonTextStyle,
  signOutButtonContainerStyle,
  modalButtonStyle,
  modalButtonIconStyle,
  modalButtonWrapperStyle,
 } = styles;

 const {
   primaryColor
 } = palette;

export default class AccountScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    currentUser: object,
    updateUser: func.isRequired,
    selectImage: func.isRequired,
    signOutMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
    }).isRequired,
  };

  state = {
    cameraModalVisible: false,
  }


  onEditPress(editScreen) {
    this.props.navigation.navigate(editScreen, {
      profileData: this.props.currentUser,
      nextScreenSequence: ["account"],
    });
  }

  onCameraPress() {
    this.setState({ cameraModalVisible: false });
    this.props.navigation.navigate("profilePictureCameraScreen", { nextScreenSequence: ["account"] });
  }

  onImageLibraryPress() {
    this.setState({ cameraModalVisible: false });
    this.props.navigation.navigate("profilePictureImageScreen", { nextScreenSequence: ["account"] });

    //this.props.selectImage(this.props.currentUser, this.props.updateUser);
  }

  onSignOutPress() {
    this.props.signOutMutation()
    .then(() => {
      this.props.updateUser(undefined);

      const closeSuccessScreenAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "mainScreen" })
        ]
      })
      return this.props.navigation.dispatch(closeSuccessScreenAction);
    })
  }


  render() {
    return (
      <View style={screenStyle}>
        {this.renderHeader()}
        {this.renderPictureInputModal()}
        <View style={contentContainerStyle}>
          {this.renderAvatar()}
          <View style={inputGroupStyle}>
            {this.renderNameInput()}
            {this.renderSchoolInput()}
            {this.renderPasswordInput()}
          </View>
        </View>
        <Button
          raised
          primary
          text="Sign Out"
          style={{ container: signOutButtonContainerStyle, text: signOutButtonTextStyle }}
          onPress={() => this.onSignOutPress()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={headerStyle}>
        <Text style={headerTitleStyle}>Account</Text>
      </View>
    );
  }

  renderAvatar() {
    return (
      <View>
        <Avatar
          uri={this.props.currentUser ? this.props.currentUser.photoUri : undefined}
          size={AVATAR_SIZE}
        />
        <ActionButton
          buttonColor={primaryColor}
          position="right"
          size={43}
          style={avatarActionButtonStyle}
          icon={
            <MaterialIcons
              name={(this.props.currentUser && this.props.currentUser.photoUri) ? "mode-edit" : "add"}
              color="white"
              size={ICON_SIZE}
            />
          }
          onPress={() => this.setState({ cameraModalVisible: true })}
        />
      </View>
    );
  }

  renderNameInput() {
    return (
      <View style={inputContainerStyle}>
        <TextField
          label="Full name"
          value={(this.props.currentUser && this.props.currentUser.fullName) ? this.props.currentUser.fullName : ""}
          editable={false}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={inputStyle}
        />
        <MaterialIcons
          name="mode-edit"
          size={ICON_SIZE}
          style={editIconStyle}
          onPress={() => this.onEditPress("changeFullNameScreen")}
        />
      </View>
    );
  }

  renderSchoolInput() {
    return (
      <View style={inputContainerStyle}>
        <TextField
          label="School"
          value={(this.props.currentUser && this.props.currentUser.schoolName) ? this.props.currentUser.schoolName : ""}
          editable={false}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={inputStyle}
        />
        <MaterialIcons
          name="mode-edit"
          size={ICON_SIZE}
          style={editIconStyle}
          onPress={() => this.onEditPress("schoolSelectionScreen")}
        />
      </View>
    );
  }

  renderPasswordInput() {
    return (
      <View style={inputContainerStyle}>
        <TextField
          label="Password"
          value="*********"
          secureTextEntry={true}
          editable={false}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={inputStyle}
        />
        <MaterialIcons
          name="mode-edit"
          size={ICON_SIZE}
          style={editIconStyle}
          onPress={() => this.onEditPress("changePasswordScreen")}
        />
      </View>
    );
  }

  renderPictureInputModal() {
    return (
      <Modal
        isVisible={this.state.cameraModalVisible}
        text="Change profile picture"
        actions={["Cancel"]}
        onActionPress={() => this.setState({ cameraModalVisible: false })}
      >
        <View style={modalButtonWrapperStyle}>
          <TouchableOpacity
            style={modalButtonStyle}
            onPress={() => this.onCameraPress()}
          >
            <MaterialCommunityIcons name="camera" size={25} style={modalButtonIconStyle}/>
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>Camera</Text>
        </View>
        <View style={modalButtonWrapperStyle}>
          <TouchableOpacity
            style={modalButtonStyle}
            onPress={() => this.onImageLibraryPress()}
          >
            <MaterialCommunityIcons name="image-multiple" size={25} style={modalButtonIconStyle}/>
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>Images</Text>
        </View>
      </Modal>
    )
  }
}
