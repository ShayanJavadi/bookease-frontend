import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Keyboard } from 'react-native'
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const { screenStyle, topContainerStyle, headerStyle, inputStyle, dropDownStyle, dropDownItemStyle, schoolNameStyle, schoolAddressStyle, buttonStyle, buttonTextStyle, noButtonPaddingStyle } = styles;

export default class SchoolSelectionScreen extends Component {
  componentWillMount() {
    this.setState({ selectedSchool: { name: "", address: "", id: -1 } });
  }

  onComplete() {
    this.props.navigation.navigate("home");
  }

  onChangeText(text) {
    this.setState({ selectedSchool: {
      name: text,
      address: "",
      id: -1,
    } });
    this.props.searchForSchool(text);
  }

  onSelectSchool(school) {
    Keyboard.dismiss();
    this.setState({ selectedSchool: school });
  }

  render() {
    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerStyle}>Select Your School</Text>
          <TextInput
            style={inputStyle}
            value={this.state.selectedSchool.name}
            onChangeText={text => this.onChangeText(text)}
          />
          <View style={dropDownStyle}>
            {this.renderSchoolList()}
          </View>
        </View>
        <View>
          {this.state.selectedSchool.id !== -1 &&
            (<Button
              raised
              primary
              style={{ container: buttonStyle, text: buttonTextStyle }}
              text="Select"
              onPress={() => this.onComplete()}
            />)
          }
          {this.state.selectedSchool.id === -1 &&
            (<View style={noButtonPaddingStyle} />)
          }
        </View>
      </View>
    );
  }

  renderSchoolList() {
    if(this.state.selectedSchool.id !== -1) return [];

    return this.props.schools.map((school, index) =>
      <TouchableOpacity key={index} style={dropDownItemStyle} onPress={() => this.onSelectSchool(school)}>
        <Text style={schoolNameStyle}>{school.name}</Text>
        <Text style={schoolAddressStyle}>{school.address}</Text>
      </TouchableOpacity>
    );
  }
}
