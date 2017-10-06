import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, Image } from "react-native";
import { func, object } from "prop-types";
import { Button, Dialog, DialogDefaultActions } from "react-native-material-ui";
import { FileSystem } from "expo";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';
import { isEmpty } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles, palette } from "./styles";
import BackButton from "src/modules/BackButton";
import { BOOK_CONDITIONS } from "./consts";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  pictureInputWrapperStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
  pictureInputStyle,
  pictureCarouselWrapperStyle,
  pictureCarouselStyle,
  textInputStyle,
  descriptionTextInputStyle,
  modalWrapperStyle,
  modalContentStyle,
  modalButtonStyle,
  modalButtonIconStyle,
  modalButtonWrapperStyle,
  pictureInputHeaderTextStyle,
  pictureInputHorizontalRuleStyle,
} = styles;

const {
  primaryColor,
  tertiaryColorDark,
  secondarColorLight,
} = palette;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Enter Book Details",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  componentDidMount() {
    // this is for debuging purposes. in the actual app
    // the directory will be deleted after the form is submitted.
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    );
  }

  componentWillUnmount() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos`);
  }

  static propTypes = {
    createNewBook: func.isRequired,
    errorsMessages: object,
  }

  state = {
    bookTitle: undefined,
    bookAuthor: undefined,
    bookEdition: undefined,
    bookCondition: undefined,
    bookPrice: undefined,
    bookIsbn: undefined,
    bookDescription: undefined,
    cameraModalVisible: false,
    deletePhotoModalVisible: false,
    descriptionTextInputSelected: false,
    imageSlidesIndex: 0,
  }

  onFormSubmit() {
    const {
      bookTitle,
      bookAuthor,
      bookEdition,
      bookCondition,
      bookPrice,
      bookIsbn,
      bookDescription,
    } = this.state;

    const bookDetails = {
      bookTitle: {
        value: bookTitle,
        humanizedValue: "Book Title",
      },
      bookAuthor: {
        value: bookAuthor,
        humanizedValue: "Book Author",
      },
      bookEdition: {
        value: bookEdition,
        humanizedValue: "Book Edition",
      },
      bookCondition: {
        value: bookCondition,
        humanizedValue: "Book Condition",
      },
      bookPrice: {
        value: bookPrice,
        humanizedValue: "Book Price",
      },
      bookIsbn: {
        value: bookIsbn,
        humanizedValue: "ISBN",
      },
      bookDescription: {
        value: bookDescription,
        humanizedValue: "Description",
      }
    }
    this.props.createNewBook(bookDetails);
  }

  onDeletePhotoPress() {
    this.setState({ deletePhotoModalVisible: true, cameraModalVisible: false });
  }

  onCameraPress() {
    this.props.navigation.navigate("newBookCamera");
    this.setState({ cameraModalVisible: false });
  }

  renderCarouselSlides(photos) {
    return photos.map((photo, index) => (
      <View key={photo.key} style={{ flex: 1 , width: SCREEN_WIDTH - 120 }}>
        <TouchableOpacity onPress={() => this.onDeletePhotoPress()} style={{ position: "relative", flexDirection: "row", justifyContent: "flex-end", top: 30, right: 35, zIndex: 9999 }}>
          <MaterialCommunityIcons name="close-circle-outline" size={20} style={{ color: "#eee" }}/>
        </TouchableOpacity>
        <TouchableHighlight
          style={{ flex: 1 , width: SCREEN_WIDTH - 120 }}
          onPress={() => this.setState({ cameraModalVisible: true })}
        >
          <Image
            style={{ flex: 1 }}
            source={{ uri: photo.uri }}
          />
        </TouchableHighlight>
      </View>
    ));
  }

  handleDeletePhotoModalActions(action) {
    const { deletePhoto, photos } = this.props;

    if (action === "erase") {
      deletePhoto(photos[this.state.imageSlidesIndex].uri)
    }

    this.setState({ deletePhotoModalVisible: false });
  }

  renderDeletePhotoModal() {
    const { Title, Content, Actions } = Dialog;
    return (
      <Modal isVisible={this.state.deletePhotoModalVisible} style={modalWrapperStyle}>
        <Dialog>
          <Title>
            <Text>Discard selected photo?</Text>
          </Title>

          <Actions>
            <DialogDefaultActions
              actions={["cancel", "erase"]}
              onActionPress={(action) => this.handleDeletePhotoModalActions(action)}
            />
          </Actions>
        </Dialog>
      </Modal>
    )
  }

  renderPictureCarousel() {
    const { navigation, photos } = this.props;
    if (!isEmpty(photos)) {
      return (
          <View style={pictureCarouselWrapperStyle}>
            <Swiper
              loop={false}
              horizontal
              activeDotColor={primaryColor}
              showsPagination={true}
              showsButtons={false}
              style={pictureCarouselStyle}
              onIndexChanged={(index) => {this.setState({ imageSlidesIndex: index })}}
            >
              {this.renderCarouselSlides(photos)}
            </Swiper>
            <ActionButton
              buttonColor={primaryColor}
              position="right"
              size={50}
              onPress={() => this.setState({ cameraModalVisible: true })}
              style={{ right: -37, bottom: -37, position: "absolute" }}
            />
          </View>
      )
    }

    return (
      <View style={pictureInputWrapperStyle}>
        <TouchableOpacity
          style={pictureInputStyle}
          onPress={() => this.setState({ cameraModalVisible: true })}
        >
          <MaterialCommunityIcons name="camera" size={50} style={{ color: "#bbb" }}/>
        </TouchableOpacity>
        <ActionButton
          buttonColor={primaryColor}
          position="right"
          size={50}
          onPress={() => this.setState({ cameraModalVisible: true })}
          style={{ right: -37, bottom: -37, position: "absolute", zIndex: 9999 }}
        />
      </View>
    )
  }

  renderPictureInput() {
    return (
      <View>
        <View>
          <Text style={pictureInputHeaderTextStyle}>Book Pictures</Text>
        </View>
          {this.renderPictureCarousel()}
        <View
          style={pictureInputHorizontalRuleStyle}
        />
      </View>
    )
  }

  renderPictureInputModal() {
    const { Title, Content, Actions } = Dialog;
    return (
      <Modal isVisible={this.state.cameraModalVisible} style={modalWrapperStyle}>
        <Dialog>
          <Title>
            <Text>Add Pictures</Text>
          </Title>
          <Content>
            <View style={modalContentStyle}>
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
                <TouchableOpacity style={modalButtonStyle}>
                  <MaterialCommunityIcons name="image-multiple" size={25} style={modalButtonIconStyle}/>
                </TouchableOpacity>
              <Text style={{ marginTop: 10 }}>Photos</Text>
              </View>
            </View>
          </Content>
          <Actions>
            <DialogDefaultActions
              actions={["Dismiss"]}
              onActionPress={() => this.setState({ cameraModalVisible: false })}
            />
          </Actions>
        </Dialog>
      </Modal>
    )
  }

  renderForm() {
    const {
      bookTitle,
      bookAuthor,
      bookEdition,
      bookCondition, // eslint-disable-line no-unused-vars
      bookPrice,
      bookIsbn,
      bookDescription,
      descriptionTextInputSelected
    } = this.state;

    const { errorsMessages } = this.props;

    return (
      <View style={{ flex: 4 }}>
        <TextField
          error={errorsMessages.bookTitle}
          label="Book Title"
          value={bookTitle}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookTitle) => this.setState({ bookTitle })}
        />
        <TextField
          error={errorsMessages.bookAuthor}
          label="Author(s)"
          value={bookAuthor}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookAuthor) => this.setState({ bookAuthor })}
        />
        <TextField
          error={errorsMessages.bookEdition}
          label="Edition"
          value={bookEdition}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookEdition) => this.setState({ bookEdition })}
        />
        <Dropdown
          error={errorsMessages.bookCondition}
          label="Condition"
          data={BOOK_CONDITIONS}
          fontSize={14}
          animationDuration={120}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookCondition) => this.setState({ bookCondition })}
        />
        <TextField
          error={errorsMessages.bookPrice}
          label="Price"
          value={bookPrice}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookPrice) => this.setState({ bookPrice })}
        />
        <TextField
          error={errorsMessages.bookIsbn}
          label="ISBN"
          value={bookIsbn}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookIsbn) => this.setState({ bookIsbn }) }
        />
        <TextField
          error={errorsMessages.bookDescription}
          label="Description"
          title="Provide additional information"
          value={bookDescription}
          multiline={true}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={[
            descriptionTextInputStyle, {
              borderColor: descriptionTextInputSelected || errorsMessages.bookDescription ? primaryColor : "#222",
            }
          ]}
          inputContainerStyle={{ height: 200 }}
          style={{ height: 160 }}
          characterRestriction={300}
          onChangeText={(bookDescription) => this.setState({ bookDescription })}
          onFocus={() => this.setState({ descriptionTextInputSelected: true })}
          onBlur={() => this.setState({ descriptionTextInputSelected: false })}
        />
      </View>
    )
  }

  renderConfirmButton() {
    return (
      <View style={buttonWrapperStyle}>
        <Button
          text="Confirm"
          raised
          style={{ text: buttonTextStyle, container: buttonContainerStyle }}
          onPress={() => this.onFormSubmit()}
        />
      </View>
    );
  }

  renderActionButton() {
    return (
      <ActionButton
        buttonColor={tertiaryColorDark}
        position="right"
        onPress={() => this.props.navigation.navigate("scanBook")}
        style={{ right: -15, bottom: -10 }}
        icon={<MaterialCommunityIcons name="barcode-scan" size={28} style={{ color: "#fff", paddingTop: 4 }} />}
      />
    )
  }

  render() {
    return (
      <View style={screenStyle}>
        <KeyboardAwareScrollView
          style={{ paddingTop: 20 }}
          extraScrollHeight={80}
        >
          {this.renderPictureInput()}
          {this.renderForm()}
          {this.renderConfirmButton()}
          {this.renderPictureInputModal()}
          {this.renderDeletePhotoModal()}
        </KeyboardAwareScrollView>
        {this.renderActionButton()}
      </View>
    );
  }
}
