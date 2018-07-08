import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import ActionButton from "react-native-action-button";
import { TextField } from "react-native-material-textfield";
import { NavigationActions, StackActions } from "react-navigation";
import { ImagePicker } from "expo"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { func, object, shape, bool } from "prop-types";
import { isEmpty } from "lodash";
import { styles, palette, ICON_SIZE, AVATAR_SIZE } from "./styles";
import Header from "src/modules/Header";
import Modal from "src/modules/Modal";
import Avatar from "src/modules/Avatar";
import uploadImage from "src/common/lib/uploadImage";


const {
  screenStyle,
  contentContainerStyle,
  avatarActionButtonStyle,
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
    currentStoredUser: object.isRequired,
    removeStoredUser: object.isRequired,
    signOutMutation: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    isFocused: bool.isRequired,
  };

  state = {
    isLoading: true,
    cameraModalVisible: false,
    fullName: "",
    schoolName: "",
  }

  componentWillMount() {
    if (this.props.isFocused) {
      const { currentStoredUser } = this.props;
      if (!isEmpty(currentStoredUser)) {
        const { fullName, schoolName } = currentStoredUser;

        return this.setState({
          fullName: fullName,
          schoolName: schoolName,
          isLoading: false,
        });
      }

      this.setState({
        fullName: "",
        schoolName: "",
        isLoading: false,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("cwrp");
    console.log(nextProps.currentStoredUser);

    if (nextProps.isFocused) {
      const { currentStoredUser } = this.props;
      if (!isEmpty(currentStoredUser)) {
        const { fullName, schoolName } = currentStoredUser;

        return this.setState({
          fullName: fullName,
          schoolName: schoolName,
          isLoading: false,
        });
      }

      this.setState({
        fullName: "",
        schoolName: "",
        isLoading: false,
      });
    }
  }

  editItem(editScreen) {
    this.props.navigation.navigate(editScreen, {
      profileData: this.props.currentStoredUser,
      nextScreenSequence: ["account"],
    });
  }

  onCameraPress() {
    this.setState({ cameraModalVisible: false });
    this.props.navigation.navigate("profilePictureCameraScreen", { nextScreenSequence: ["account"] });
  }

  async onImageLibraryPress() {
    const { currentStoredUser, setStoredUser, mutate } = this.props;
    const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({ base64: true });

    this.setState({ cameraModalVisible: false });

    if (cancelled) return;

    const uploadedPhotoUrl = await uploadImage(uri);

    await mutate({
      variables: {
        phoneNumber: currentStoredUser.phoneNumber,
        photoUrl: uploadedPhotoUrl,
      }
    });

    await setStoredUser({
       ...currentStoredUser,
       photoURL: uploadedPhotoUrl
     });
  }

  async signOut() {
    await this.props.signOutMutation();
    await this.props.removeStoredUser();
    const navigateToHomeScreen = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "mainScreen" })
      ]
    })
    this.setState({ schoolName: "", });
    return this.props.navigation.dispatch(navigateToHomeScreen);

  }

  render() {
    return (
      <View style={screenStyle}>
        {this.renderPictureInputModal()}
        <Header
          text="Account"
         />
         {
           this.state.isLoading ?
           this.renderSpinner() :
           this.renderAccountInformation()
         }
      </View>
    );
  }

  renderSpinner = () => (
    <View style={contentContainerStyle}>
      <ActivityIndicator
        size="large"
        color="#222"
      />
    </View>
  )

  renderAccountInformation = () => (
    <View style={contentContainerStyle}>
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
        onPress={() => this.signOut()}
      />
    </View>
  )

  renderAvatar() {
    return (
      <View>
        <Avatar
          uri={this.props.currentStoredUser ? this.props.currentStoredUser.photoURL : undefined}
          size={AVATAR_SIZE}
        />
        <ActionButton
          buttonColor={primaryColor}
          position="right"
          size={43}
          style={avatarActionButtonStyle}
          icon={
            <MaterialIcons
              name={(this.props.currentStoredUser && this.props.currentStoredUser.photoURL) ? "mode-edit" : "add"}
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
          value={this.state.fullName}
          editable={false}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={inputStyle}
        />
        <MaterialIcons
          name="mode-edit"
          size={ICON_SIZE}
          style={editIconStyle}
          onPress={() => this.editItem("changeFullNameScreen")}
        />
      </View>
    );
  }

  renderSchoolInput() {
    return (
      <View style={inputContainerStyle}>
        <TextField
          label="School"
          value={this.state.schoolName}
          editable={false}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={inputStyle}
        />
        <MaterialIcons
          name="mode-edit"
          size={ICON_SIZE}
          style={editIconStyle}
          onPress={() => this.editItem("schoolSelectionScreen")}
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
          onPress={() => this.editItem("changePasswordScreen")}
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
          <MaterialCommunityIcons name="camera" size={25} style={modalButtonIconStyle} />
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>Camera</Text>
        </View>
        <View style={modalButtonWrapperStyle}>
          <TouchableOpacity
            style={modalButtonStyle}
            onPress={() => {try{this.onImageLibraryPress()}catch(ex){console.log(ex)}}}
          >
          <MaterialCommunityIcons name="image-multiple" size={25} style={modalButtonIconStyle} />
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>Images</Text>
        </View>
      </Modal>
    )
  }
}
