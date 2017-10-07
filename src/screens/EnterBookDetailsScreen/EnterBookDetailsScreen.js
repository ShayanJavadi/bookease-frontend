import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, Image } from "react-native";
import { func, object, bool, array, shape } from "prop-types";
import { Button, Dialog, DialogDefaultActions } from "react-native-material-ui";
import { FileSystem } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { isEmpty, reverse } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles, palette } from "./styles";
import BackButton from "src/modules/BackButton";
import { BOOK_CONDITIONS } from "./consts";

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
  carouselSlidesWrapperStyle,
  carouselDeleteButtonWrapperStyle,
  textInputStyle,
  descriptionTextInputStyle,
  modalWrapperStyle,
  modalContentStyle,
  modalButtonStyle,
  modalButtonIconStyle,
  modalButtonWrapperStyle,
  pictureInputHeaderTextStyle,
  pictureInputHorizontalRuleStyle,
  pictureInputActionButtonStyle,
} = styles;

const {
  primaryColor,
  tertiaryColorDark,
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

  static propTypes = {
    createNewBook: func.isRequired,
    launchPhotoLibrary: func.isRequired,
    deletePhoto: func.isRequired,
    errorsMessages: object.isRequired,
    photoGalleryOpen: bool.isRequired,
    photos: array.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
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

  componentDidMount() {
    // this is for debuging purposes. in the actual app
    // the directory will be deleted after the form is submitted.
    FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}photos`)
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.photoGalleryOpen && nextProps.photoGalleryOpen) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos`);
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
    this.setState({ cameraModalVisible: false });
    this.props.navigation.navigate("newBookCamera");
  }

  onPhotoLibraryPress() {
    this.props.launchPhotoLibrary();
    this.setState({ cameraModalVisible: false });
  }

  onModalActionPress(action) {
    const { deletePhoto, photos } = this.props;

    if (action === "erase") {
      deletePhoto(photos[this.state.imageSlidesIndex].uri)
    }

    this.setState({ deletePhotoModalVisible: false });
  }

// TODO: bring up bigger swiper modal with the same pictures when you press on the pictures
  renderCarouselSlides(photos) {
    return photos.map((photo) => (
      <View key={photo.key} style={carouselSlidesWrapperStyle}>
        <TouchableOpacity onPress={() => this.onDeletePhotoPress()} style={carouselDeleteButtonWrapperStyle}>
          <MaterialCommunityIcons name="close-circle-outline" size={20} style={{ color: "#eee" }}/>
        </TouchableOpacity>
        <TouchableHighlight
          style={carouselSlidesWrapperStyle}
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

  renderPictureCarousel() {
    const { photos } = this.props;
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
              style={pictureInputActionButtonStyle}
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
          style={pictureInputActionButtonStyle}
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
                <TouchableOpacity style={modalButtonStyle} onPress={() => this.onPhotoLibraryPress()}>
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

  renderDeletePhotoModal() {
    const { Title, Actions } = Dialog;
    return (
      <Modal isVisible={this.state.deletePhotoModalVisible} style={modalWrapperStyle}>
        <Dialog>
          <Title>
            <Text>Discard selected photo?</Text>
          </Title>
          <Actions>
            <DialogDefaultActions
              actions={["cancel", "erase"]}
              onActionPress={(action) => this.onModalActionPress(action)}
            />
          </Actions>
        </Dialog>
      </Modal>
    )
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
