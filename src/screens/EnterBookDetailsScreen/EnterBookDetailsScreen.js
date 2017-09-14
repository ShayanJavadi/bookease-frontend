import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Button } from "react-native-material-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import BackButton from "src/modules/BackButton";
const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
  pictureInputWrapperStyle,
  formWrapperStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonContainerStyle,
  pictureInputStyle,
  inputStyle,
  inputWrapperStyle,
  bookTitleInputWrapperStyle,
  bookTitleInputStyle,
  bookIsbnWrapperStyle,
  bookIsbnInputStyle,
  bookEditionWrapperStyle,
  bookEditionInputStyle,
  bookAuthorInputStyle,
  bookConditionWrapperStyle,
  bookPriceInputStyle,
  bookConditionInputStyle,
  horizantalLineStyle
} = styles;

export default class EnterBookDetailsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    headerTitle: "Enter Book Details",
    headerLeft: <BackButton navigation={navigation} buttonText="Back" />,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  renderPictureInput() {
    return (
     <View style={pictureInputWrapperStyle}>
       <TouchableOpacity style={pictureInputStyle}>
         <MaterialCommunityIcons name="camera" size={50} style={{ color: "#ccc" }}/>
       </TouchableOpacity>
     </View>
    )
  }

  renderForm() {
    return (
      <View style={formWrapperStyle}>
        <View style={[inputWrapperStyle, bookTitleInputWrapperStyle]}>
          <TextInput
            placeholderTextColor="#ccc"
            style={[inputStyle, bookTitleInputStyle]}
            placeholder="Book Title"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={[inputWrapperStyle, bookIsbnWrapperStyle]}>
          <TextInput
            placeholderTextColor="#ccc"
            style={[inputStyle, bookIsbnInputStyle]}
            placeholder="Isbn"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={[inputWrapperStyle, bookEditionWrapperStyle]}>
          <TextInput
            placeholderTextColor="#ccc"
            style={[inputStyle, bookEditionInputStyle]}
            placeholder="Edition"
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholderTextColor="#ccc"
            style={[inputStyle, bookAuthorInputStyle]}
            placeholder="Author"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={[inputWrapperStyle, bookConditionWrapperStyle]}>
          <View style={{ flex: 1}}>
            <TextInput
              placeholderTextColor="#ccc"
              style={[inputStyle, bookConditionInputStyle]}
              placeholder="Condition"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{flex: 1}}>
            <TextInput
              placeholderTextColor="#ccc"
              style={[inputStyle, bookPriceInputStyle]}
              placeholder="Price"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>
    )
  }

  renderConfirmButton() {
    return (
      <View style={buttonWrapperStyle}>
        <Button
          text="Confirm"
          raised
          style={{text: buttonTextStyle, container: buttonContainerStyle}}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={screenStyle}>
        {this.renderPictureInput()}
        {this.renderForm()}
        {this.renderConfirmButton()}
      </View>
    );
  }
}
