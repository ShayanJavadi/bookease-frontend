import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, Image, ActivityIndicator } from "react-native";
import { func, object, bool, array, shape, string } from "prop-types";
import { Button } from "react-native-material-ui";
import { NavigationActions } from "react-navigation";
import { FileSystem } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Swiper from "react-native-swiper";
import { isEmpty, lowerCase, isEqual } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { styles, palette } from "./styles";
import BackButton from "src/modules/BackButton";
import { BOOK_CONDITIONS } from "src/common/consts";
import { mapConditionToNumbers, mapNumberToConditions } from "src/common/lib";
import Header from "src/modules/Header";
import Modal from "src/modules/Modal";

const {
  screenStyle,
  pictureInputWrapperStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
  pictureInputStyle,
  pictureInputStyleHasErrors,
  pictureCarouselWrapperStyle,
  pictureCarouselStyle,
  carouselSlidesWrapperStyle,
  carouselDeleteButtonWrapperStyle,
  textInputStyle,
  descriptionTextInputStyle,
  modalButtonStyle,
  modalButtonIconStyle,
  modalButtonWrapperStyle,
  pictureInputHeaderTextStyle,
  pictureInputHorizontalRuleStyle,
  pictureInputHeaderTextStyleHasErrors,
  pictureInputHorizontalRuleStyleHasErrors,
  pictureInputActionButtonStyle,
  pictureInputErrorMessageStyle,
} = styles;

const {
  primaryColor,
  tertiaryColorDark,
} = palette;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    createNewBook: func.isRequired,
    launchImageLibrary: func.isRequired,
    deleteImage: func.isRequired,
    errorsMessages: object.isRequired,
    imageGalleryOpen: bool.isRequired,
    images: array.isRequired,
    mutate: func.isRequired,
    data: object,
    submittedBook: object.isRequired,
    submissionType: string.isRequired,
    isSubmitting: bool.isRequired,
    loadingMessage: string.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired,
    getTextbookQuery: func.isRequired,
    updateTextbookMutation: func.isRequired,
    createTextbookMutation: func.isRequired,
    deleteTextbookMutation: func.isRequired,
    resetState: func.isRequired,
    updateTextbook: func.isRequired,
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
    deleteImageModalVisible: false,
    descriptionTextInputSelected: false,
    imageSlidesIndex: 0,
    updateMode: false,
    textbookIdToUpdate: undefined,
    deleteTextbookModalVisible: undefined,
    uploadedImages: [],
    newImages: [],
    allImages: [],
    carouselKey: Math.random(),
  }

  inputs = {}
  componentWillMount() {
    const { navigation } = this.props;

    const textbookIdToUpdate = navigation.state.params ?
    navigation.state.params.textbookIdToUpdate :
    undefined;

    if (textbookIdToUpdate !== undefined) {
      this.fetchTextbookToUpdate(textbookIdToUpdate);
      this.setState({ updateMode: true, textbookIdToUpdate: textbookIdToUpdate })
    }
  }

  async componentDidMount() {
    const { navigation, images } = this.props;
    const { uploadedImages } = this.state;

    const imagesDirectory = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}images`);
    if (!imagesDirectory.exists) {
      FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}images`);
    }

    this.setState({ newImages: images });
    this.rebuildImagesArray(uploadedImages, images);

    const scannedTextbook = navigation.state.params ?
    navigation.state.params.scannedTextbook :
    undefined;

    if (scannedTextbook) {
      this.populateForm(scannedTextbook);
    }
  }

  fetchTextbookToUpdate(textbookIdToUpdate) {
    this.props.getTextbookQuery.refetch({ textbookId: textbookIdToUpdate })
    .then((textbook) => {
        this.setState({ uploadedImages: textbook.data.getTextbook.images });
        this.rebuildImagesArray(textbook.data.getTextbook.images, this.state.newImages);
        this.populateForm(textbook.data.getTextbook);
    })
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const textbookWasCreated = nextProps.submittedBook && nextProps.submissionType === "createTextbook";

    if (textbookWasCreated) {
      navigation.navigate("submissionSuccessScreen", { submittedBook: nextProps.submittedBook });
    }

    const textbookWasUpdated = nextProps.submittedBook && nextProps.submissionType === "updateTextbook";

    if (textbookWasUpdated) {
      const navigateToSingleBookScreenAction = NavigationActions.reset({
        index: 1,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "mainScreen" }),
          NavigationActions.navigate({ routeName: "singleBook", params: { textbookId: nextProps.submittedBook } })
        ]
      })

      this.props.navigation.dispatch(navigateToSingleBookScreenAction)
    }

    const shouldRebuildImageArray = !isEqual(this.props.images, nextProps.images);

    if (shouldRebuildImageArray) {
      this.setState({ newImages: nextProps.images });
      this.rebuildImagesArray(this.state.uploadedImages, nextProps.images)
      this.resetCarousel();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.imageGalleryOpen && nextProps.imageGalleryOpen) {
      return false;
    }

    return true;
  }

  async componentWillUnmount() {
    // this is for debuging purposes. in the actual app
    // the directory will be deleted after the form is submitted.
    const imagesDirectory = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}images`);
    if (!imagesDirectory.exists) {
      FileSystem.deleteAsync(`${FileSystem.documentDirectory}images`);
    }

    this.props.resetState();
  }

  rebuildImagesArray(uploadedImages, newImages) {
    this.setState({ allImages: [...uploadedImages, ...newImages] });
  }

  resetCarousel() {
    this.setState({ carouselKey: Math.random(), imageSlidesIndex: 0 });
  }

  populateForm(textbook) {
    const { title, authors, edition, industryIdentifiers, price, condition, description } = textbook;

    this.setState({ bookTitle: title })
    this.setState({ bookAuthor: authors.join(", ") })
    this.setState({ bookIsbn: industryIdentifiers[0].identifier })
    this.setState({ bookEdition: edition })
    this.setState({ bookPrice: price.toString() })
    this.setState({ bookCondition: mapNumberToConditions(condition) })
    this.setState({ bookDescription: description })
  }

  onFormSubmit = () => {
    const { createNewBook,  createTextbookMutation, updateTextbook, updateTextbookMutation } = this.props;
    const {
      bookTitle,
      bookAuthor,
      bookEdition,
      bookIsbn,
      bookPrice,
      bookDescription,
    } = this.state;

    const bookCondition = mapConditionToNumbers(lowerCase(this.state.bookCondition));
    const bookDetails = {
      bookImages: {
        value: this.props.images,
        humanizedValue: "Book Images",
      },
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
      },
    };

    if (this.state.updateMode) {
      const { uploadedImages, allImages } = this.state;

      bookDetails.bookImages.value = allImages;

      return updateTextbook(bookDetails, uploadedImages, updateTextbookMutation, this.state.textbookIdToUpdate);
    }

    return createNewBook(bookDetails, createTextbookMutation);
  }

  onDeleteImagePress() {
    this.setState({ deleteImageModalVisible: true, cameraModalVisible: false });
  }

  onDeleteTextbookPress() {
    this.setState({ deleteTextbookModalVisible: true, cameraModalVisible: false })
  }

  onCameraPress() {
    this.setState({ cameraModalVisible: false });
    this.props.navigation.navigate("newBookCamera");
  }

  onImageLibraryPress() {
    this.props.launchImageLibrary();
    this.setState({ cameraModalVisible: false });
  }

  onDeleteImageModalActionPress(action) {
    const { deleteImage } = this.props;
    const { allImages, imageSlidesIndex, newImages, uploadedImages } = this.state;

    if (action === "erase") {
      const isImageAlreadyUploaded = allImages[imageSlidesIndex].uri;

      if (isImageAlreadyUploaded) {
        this.setState({ deleteImageModalVisible: false });
        deleteImage(allImages[imageSlidesIndex].uri)
        this.resetCarousel();
        return;
      }

      this.setState(
        {
          uploadedImages: uploadedImages.filter((image, index) => {
            return index !== imageSlidesIndex
          })
        },
        () => {
          this.resetCarousel();
          this.rebuildImagesArray(this.state.uploadedImages, newImages)
          this.setState({ deleteImageModalVisible: false });
          return;
        }
      );
    }

    if (action === "cancel") {
      this.setState({ deleteImageModalVisible: false });
    }
  }

  onDeleteTextbookModalActionPress(action) {
    const { deleteTextbookMutation } = this.props;
    if (action === "erase") {
      deleteTextbookMutation({
        variables: {
          textbookId: this.state.textbookIdToUpdate
        }
      })
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: "mainScreen",
            })
          ],
        })

        this.props.navigation.dispatch(resetAction)
      })
    }

    this.setState({ deleteTextbookModalVisible: false });
  }

// TODO: bring up bigger swiper modal with the same pictures when you press on the pictures
  renderCarouselSlides(images) {
    return images.map((image, index) => (
      <View key={index} style={carouselSlidesWrapperStyle}>
        <TouchableOpacity onPress={() => this.onDeleteImagePress()} style={carouselDeleteButtonWrapperStyle}>
          <MaterialCommunityIcons name="close-circle-outline" size={25} style={{ color: "#fff" }}/>
        </TouchableOpacity>
        <TouchableHighlight
          style={carouselSlidesWrapperStyle}
          onPress={() => this.setState({ cameraModalVisible: true })}
        >
          <Image
            style={{ flex: 1 }}
            source={{ uri: image.uri || image.thumbnail  }}
          />
        </TouchableHighlight>
      </View>
    ));
  }

  renderPictureCarousel() {
    const { errorsMessages } = this.props;
    const images = this.state.allImages;

    if (!isEmpty(images)) {
      return (
          <View style={pictureCarouselWrapperStyle} key={this.state.carouselKey}>
            <Swiper
              loop={false}
              horizontal
              dotStyle={{ backgroundColor: "rgba(0,0,0,.7)" }}
              activeDotColor={primaryColor}
              showsPagination={true}
              showsButtons={false}
              style={pictureCarouselStyle}
              onIndexChanged={(index) => {this.setState({ imageSlidesIndex: index })}}
              ref={component => this.swiper = component}
            >
              {this.renderCarouselSlides(images)}
            </Swiper>
            <ActionButton
              buttonColor={primaryColor}
              position="right"
              size={43}
              onPress={() => this.setState({ cameraModalVisible: true })}
              style={pictureInputActionButtonStyle}
            />
          </View>
      )
    }

    return (
      <View style={pictureInputWrapperStyle}>
        <TouchableOpacity
          style={errorsMessages.bookImages ? pictureInputStyleHasErrors : pictureInputStyle}
          onPress={() => this.setState({ cameraModalVisible: true })}
        >
          <MaterialCommunityIcons name="camera" size={50} style={{ color: "#bbb" }}/>
        </TouchableOpacity>
        <ActionButton
          buttonColor={primaryColor}
          position="right"
          size={43}
          onPress={() => this.setState({ cameraModalVisible: true })}
          style={pictureInputActionButtonStyle}
        />
      </View>
    )
  }

  renderPictureInput() {
    const { errorsMessages } = this.props;

    return (
      <View>
        <View>
          <Text style={errorsMessages.bookImages ? pictureInputHeaderTextStyleHasErrors : pictureInputHeaderTextStyle}>Book Pictures*</Text>
        </View>
          {this.renderPictureCarousel()}
        <View
          style={errorsMessages.bookImages ? pictureInputHorizontalRuleStyleHasErrors : pictureInputHorizontalRuleStyle}
        />
        <View>
          {errorsMessages.bookImages ? <Text style={pictureInputErrorMessageStyle}>{errorsMessages.bookImages}</Text> : null}
        </View>
      </View>
    )
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  renderForm() {
    const {
      bookTitle,
      bookAuthor,
      bookEdition,
      bookCondition,
      bookPrice,
      bookIsbn,
      bookDescription,
      descriptionTextInputSelected,
    } = this.state;

    const { errorsMessages } = this.props;

    return (
      <View style={{ flex: 4 }}>
        <TextField
          returnKeyType="next"
          error={errorsMessages.bookTitle}
          label="Book Title*"
          value={bookTitle}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookTitle) => this.setState({ bookTitle })}
          ref={ input => this.inputs["bookTitle"] = input }
          onSubmitEditing={() => this.focusNextField("authors")}
        />
        <TextField
          returnKeyType="next"
          error={errorsMessages.bookAuthor}
          label="Author(s)*"
          value={bookAuthor}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookAuthor) => this.setState({ bookAuthor })}
          ref={ input => this.inputs["authors"] = input}
          onSubmitEditing={() => this.focusNextField("isbn")}
        />
        <TextField
          returnKeyType="next"
          keyboardType="numeric"
          error={errorsMessages.bookIsbn}
          label="ISBN*"
          value={bookIsbn}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookIsbn) => this.setState({ bookIsbn }) }
          ref={ input => this.inputs["isbn"] = input }
          onSubmitEditing={() => this.focusNextField("edition")}
        />
        <TextField
          keyboardType="numeric"
          returnKeyType="next"
          error={errorsMessages.bookEdition}
          label="Edition*"
          value={bookEdition}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookEdition) => this.setState({ bookEdition })}
          ref={ input => this.inputs["edition"] = input }
        />
        <TextField
          returnKeyType="next"
          keyboardType="numeric"
          error={errorsMessages.bookPrice}
          label="Price*"
          value={bookPrice}
          fontSize={14}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookPrice) => this.setState({ bookPrice })}
          ref={ input => this.inputs["price"] = input }
        />
        <Dropdown
          error={errorsMessages.bookCondition}
          label="Condition*"
          data={BOOK_CONDITIONS}
          fontSize={14}
          animationDuration={120}
          tintColor={primaryColor}
          containerStyle={textInputStyle}
          onChangeText={(bookCondition) => this.setState({ bookCondition })}
          value={bookCondition}
        />
        <TextField
          error={errorsMessages.bookDescription}
          label="*Description"
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
          ref={ input => this.inputs["description"] = input }
        />
      </View>
    )
  }

  renderConfirmButton() {
    return (
      <View style={buttonWrapperStyle}>
        <Button
          text="Submit"
          raised
          style={{ text: buttonTextStyle, container: buttonContainerStyle }}
          onPress={() => this.onFormSubmit()}/>
      </View>
    );
  }

  renderPictureInputModal() {
    return (
      <Modal
        isVisible={this.state.cameraModalVisible}
        text="Add Pictures"
        actions={["Dismiss"]}
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
          <TouchableOpacity style={modalButtonStyle} onPress={() => this.onImageLibraryPress()}>
            <MaterialCommunityIcons name="image-multiple" size={25} style={modalButtonIconStyle}/>
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>Images</Text>
        </View>
      </Modal>
    )
  }

  renderDeleteImageModal() {
    return (
      <Modal
        isVisible={this.state.deleteImageModalVisible}
        text="Discard selected image?"
        actions={["cancel", "erase"]}
        onActionPress={(action) => this.onDeleteImageModalActionPress(action)}
      />
    )
  }

  renderDeleteTextbookModal() {
    return (
      <Modal
        isVisible={this.state.deleteTextbookModalVisible}
        text="Discard this listing?"
        actions={["cancel", "erase"]}
        onActionPress={(action) => this.onDeleteTextbookModalActionPress(action)}
      />
    )
  }

  renderActionButton() {
    return (
      <ActionButton
        buttonColor={tertiaryColorDark}
        position="right"
        onPress={
          this.state.updateMode ?
          () => this.setState({ deleteTextbookModalVisible: true }) :
          () => this.props.navigation.navigate("scanBook")
        }
        style={{ right: -15, bottom: -10 }}
        icon={
          this.state.updateMode ?
          <MaterialCommunityIcons name="delete-forever" size={35} style={{ color: "#fff", paddingTop: 4 }} /> :
          <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <MaterialCommunityIcons name="barcode-scan" size={25} style={{ color: "#fff", marginTop: 2 }}/>
            <Text style={{ color: "#fff", position: "relative", bottom: 3, fontWeight: "700", fontSize: 10 }}>SCAN</Text>
          </View>
        }
      />
    )
  }

  render() {
   const { navigation, data, getTextbookQuery, isSubmitting, loadingMessage } = this.props;
   const error =  data ?
   data.error :
   null;

   if (error) {
     console.warn(error); // eslint-disable-line no-console
   }

   const hasTextbookBeenFetched = getTextbookQuery.loading || (!getTextbookQuery.getTextbook && this.state.updateMode);

   if (hasTextbookBeenFetched) {
     return (
       <View style={{ flex: 1, justifyContent: "center" }}>
         <ActivityIndicator
           size="large"
           color={tertiaryColorDark}
         />
       </View>
     )
   }

   return (
     <View style={screenStyle}>
       <KeyboardAwareScrollView
         enableResetScrollToCoords={false}
         extraScrollHeight={80}
         style={{ paddingTop: 20 }}
         keyboardShouldPersistTaps="handled"
         keyboardDismissMode="on-drag"
       >
         {this.renderPictureInput()}
         {this.renderForm()}
         {this.renderConfirmButton()}
         {this.renderPictureInputModal()}
         {this.renderDeleteImageModal()}
         {this.renderDeleteTextbookModal()}
       </KeyboardAwareScrollView>
        {this.renderActionButton()}
       <Header
         leftComponent={<BackButton navigation={navigation}/>}
         rightComponent={
           <Button
             text="submit"
             raised
             primary
             style={{
               container: {
                 margin: 10,
               },
               text: {
                 color: "#fff",
               },
             }}
             onPress={() => this.onFormSubmit()}
           />
         }
         text="Enter Book Details"
        />
       <Spinner
         visible={isSubmitting}
         textContent={loadingMessage}
         overlayColor="rgba(0, 0, 0, 0.65)"
         textStyle={{ color: "#FFF" }}
       />
     </View>
   );
 }
}
