import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
import { NavigationActions } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { func, object, shape, bool } from "prop-types";
import { isEmpty } from "lodash";
import { styles, palette, ICON_SIZE } from "./styles";
import Header from "src/modules/Header";

const {
  screenStyle,
  contentContainerStyle,
  inputGroupStyle,
  inputContainerStyle,
  inputStyle,
  editButtonTextStyle,
  editButtonContainerStyle,
  editButtonIconStyle,
  signOutButtonTextStyle,
  signOutButtonContainerStyle
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
    fullName: "",
    schoolName: "",
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused) {
      const { currentStoredUser } = this.props;
      if (!isEmpty(currentStoredUser)) {
        const { fullName, schoolName } = currentStoredUser;

        return this.setState({
          fullName: fullName,
          schoolName: schoolName,
          isLoading: false,
        })
      }

      this.setState({
        fullName: "",
        schoolName: "",
        isLoading: false,
      })
    }
  }

  editItem(editScreen) {
    this.props.navigation.navigate(editScreen, {
      profileData: this.props.currentStoredUser,
      nextScreenSequence: ["account"],
    });
  }

  async signOut() {
    await this.props.signOutMutation();
    await this.props.removeStoredUser();
    const navigateToHomeScreen = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "mainScreen" })
      ]
    })
    this.setState({ schoolName: "", })
    return this.props.navigation.dispatch(navigateToHomeScreen);

  }

  render() {
    return (
      <View style={screenStyle}>
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
      <View style={inputGroupStyle}>
        {this.renderNameInput()}
        {this.renderSchoolInput()}
        {this.renderPasswordInput()}
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
        <Button
          raised
          primary
          text=" Edit"
          style={{ container: editButtonContainerStyle, text: editButtonTextStyle }}
          icon={<MaterialIcons name="mode-edit" size={ICON_SIZE} style={editButtonIconStyle} />}
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
        <Button
          raised
          primary
          text=" Edit"
          style={{ container: editButtonContainerStyle, text: editButtonTextStyle }}
          icon={<MaterialIcons name="mode-edit" size={ICON_SIZE} style={editButtonIconStyle} />}
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
        <Button
          raised
          primary
          text=" Edit"
          style={{ container: editButtonContainerStyle, text: editButtonTextStyle }}
          icon={<MaterialIcons name="mode-edit" size={ICON_SIZE} style={editButtonIconStyle} />}
          onPress={() => this.editItem("changePasswordScreen")}
        />
      </View>
    );
  }
}
