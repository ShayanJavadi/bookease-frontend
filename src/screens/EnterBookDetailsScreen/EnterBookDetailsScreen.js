import React, { Component } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text } from "react-native";
import { Button, Dialog, DialogDefaultActions } from "react-native-material-ui";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
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
} = palette;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    headerTitle: "Enter Book Details",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  state = {
    bookTitle: undefined,
    bookAuthor: undefined,
    bookEdition: undefined,
    bookCondition: undefined,
    bookPrice: undefined,
    bookIsbn: undefined,
    bookDescription: undefined,
    modalVisible: false,
    descriptionTextInputSelected: false,
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

  renderPictureInput() {
    return (
      <View>
        <View>
          <Text style={pictureInputHeaderTextStyle}>Book Pictures</Text>
        </View>
        <View style={pictureInputWrapperStyle}>
          <TouchableOpacity
          style={pictureInputStyle}
          onPress={() => this.setState({ modalVisible: true })}
          >
          <MaterialCommunityIcons name="camera" size={50} style={{ color: "#bbb" }}/>
          </TouchableOpacity>
        </View>
        <View
          style={pictureInputHorizontalRuleStyle}
        />
      </View>
    )
  }

  renderPictureInputModal() {
    const { Title, Content, Actions } = Dialog;

    return (
      <Modal isVisible={this.state.modalVisible} style={modalWrapperStyle}>
        <Dialog>
          <Title>
            <Text>Add Book Pictures</Text>
          </Title>
          <Content>
            <View style={modalContentStyle}>
              <View style={modalButtonWrapperStyle}>
                <TouchableOpacity style={modalButtonStyle}>
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
              actions={['Dismiss']}
              onActionPress={() => this.setState({ modalVisible: false })}
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
      bookCondition,
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
          title="Additional information about the book"
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
