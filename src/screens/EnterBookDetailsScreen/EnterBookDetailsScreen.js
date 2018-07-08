import React, { Component } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { func, object, bool, array, shape, string } from "prop-types";
import { Button } from "react-native-material-ui";
import { NavigationActions, StackActions } from "react-navigation";
import { FileSystem, Permissions } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { lowerCase, isEqual } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { styles, palette } from "./styles";
import BackButton from "src/modules/BackButton";
import { mapConditionToNumbers, mapNumberToConditions } from "src/common/lib";
import Header from "src/modules/Header";
import Modal from "src/modules/Modal";
import Form from  "./Form";
import PictureInput from  "./PictureInput";
import FloatingBottomContainer from "src/modules/FloatingBottomContainer";

const {
  screenStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
  modalButtonStyle,
  modalButtonIconStyle,
  modalButtonWrapperStyle,
} = styles;

const {
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
    scrollView: undefined,
  }

  UNSAFE_componentWillMount() {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const textbookWasCreated = nextProps.submittedBook && nextProps.submissionType === "createTextbook";

    if (textbookWasCreated) {
      navigation.navigate("submissionSuccessScreen", { submittedBook: nextProps.submittedBook });
    }

    const textbookWasUpdated = nextProps.submittedBook && nextProps.submissionType === "updateTextbook";

    if (textbookWasUpdated) {
      const navigateToSingleBookScreenAction = StackActions.reset({
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
    const { createNewBook, createTextbookMutation, updateTextbook, updateTextbookMutation } = this.props;
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
    Permissions.askAsync(Permissions.CAMERA_ROLL).then(() => {
      this.props.launchImageLibrary();
      this.setState({ cameraModalVisible: false });
    })
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
        const resetAction = StackActions.reset({
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

  renderHeader = () => (
    <Header
      leftComponent={<BackButton navigation={this.props.navigation}/>}
      text="Enter Book Details"
     />
  )

  renderPictureInput() {
    const { errorsMessages } = this.props;
    const { allImages, carouselKey } = this.state;
    if (!this.state.scrollView) {
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
      <PictureInput
        errorsMessages={errorsMessages}
        images={allImages}
        carouselKey={carouselKey}
        onCarouselIndexChange={(index) => {this.setState({ imageSlidesIndex: index })}}
        onPress={() => this.setState({ cameraModalVisible: true })}
        onDeleteImagePress={() => this.onDeleteImagePress()}
      />
    )
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

    const formInputValues = {
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      bookEdition: bookEdition,
      bookCondition: bookCondition,
      bookPrice: bookPrice,
      bookIsbn: bookIsbn,
      bookDescription: bookDescription,
      descriptionTextInputSelected: descriptionTextInputSelected,
    }

    if (!this.state.scrollView) {
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
     <Form
       errorsMessages={errorsMessages}
       formInputValues={formInputValues}
       updateFormInputValues={(formInputValues) => this.setState(formInputValues)}
       scrollView={this.state.scrollView}
     />
   )
  }

  renderConfirmButton() {
    return (
      <FloatingBottomContainer>
        <View style={buttonWrapperStyle}>
          <Button
            text="Submit"
            raised
            style={{ text: buttonTextStyle, container: buttonContainerStyle }}
            onPress={() => this.onFormSubmit()}/>
        </View>
      </FloatingBottomContainer>
    );
  }

  renderPictureInputModal() {
    return (
      <Modal
        isVisible={this.state.cameraModalVisible}
        text="Add Pictures"
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
          () => this.props.navigation.navigate("scanBook", { context: "enterBookDetails" })
        }
        style={{ right: -15, bottom: 50 }}
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
   const { data, getTextbookQuery, isSubmitting, loadingMessage } = this.props;
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
       {this.renderHeader()}
       <KeyboardAwareScrollView
         extraScrollHeight={80}
         keyboardShouldPersistTaps="handled"
         keyboardDismissMode="on-drag"
         ref={ref => this.state.scrollView || this.setState({ scrollView: ref })}
       >
         {this.renderPictureInput()}
         {this.renderForm()}
         {this.renderPictureInputModal()}
         {this.renderDeleteImageModal()}
         {this.renderDeleteTextbookModal()}
       </KeyboardAwareScrollView>
        {this.renderActionButton()}
        {this.renderConfirmButton()}
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
