import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { func, string, shape, arrayOf, object } from "prop-types";
import { Button } from "react-native-material-ui";
import { styles } from "./styles";

const {
  screenStyle,
  topContainerStyle,
  headerTextStyle,
  inputStyle,
  dropDownStyle,
  dropDownItemStyle,
  buttonTextStyle,
  buttonContainerStyle,
  disabledButtonContainerStyle,
  noResultsTextStyle,
  noResultsContainerStyle,
  schoolNameStyle,
  schoolAddressStyle,
} = styles;

export default class SchoolSelectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSchool: { name: "", address: "", id: "-1" } };
  }

  static propTypes = {
    data: object.isRequired,
    schools: arrayOf(shape({
      name: string.isRequired,
      address: string.isRequired,
      id: string.isRequired
    })).isRequired,
    searchForSchool: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  onComplete() {
    this.props.navigation.navigate("home");
  }

  onChangeText(text) {
    const { searchForSchool, data } = this.props;

    this.setState({ selectedSchool: {
      name: text,
      address: "",
      id: "-1",
    } });

    searchForSchool(data.refetch, text);
  }

  onSelectSchool(school) {
    Keyboard.dismiss();
    this.setState({ selectedSchool: school });
  }

  render() {
    const validSchoolSelected = this.state.selectedSchool.id !== "-1";
    const textBoxEmpty = this.state.selectedSchool.name === "";
    const resultsEmpty = this.props.schools.length === 0;

    return (
      <View style={screenStyle}>
        <View style={topContainerStyle}>
          <Text style={headerTextStyle}>Select Your School</Text>
          <TextInput
            autoCorrect={false}
            style={inputStyle}
            value={this.state.selectedSchool.name}
            onChangeText={text => this.onChangeText(text)}
          />
          <View style={dropDownStyle}>
            {this.renderSchoolList()}
          </View>
        </View>
        {!validSchoolSelected && resultsEmpty  && !textBoxEmpty &&
          (<View style={noResultsContainerStyle}>
              <Text style={noResultsTextStyle}>No results found</Text>
            </View>)
        }
        {validSchoolSelected &&
          (<Button
              text="Select"
              raised
              style={{ text: buttonTextStyle, container: buttonContainerStyle }}
              onPress={() => this.onComplete()}
            />)
        }
        {!validSchoolSelected &&
          (<Button disabled
              text="Select"
              raised
              style={{ text: buttonTextStyle, container: disabledButtonContainerStyle }}
              onPress={() => this.onComplete()}
            />)
        }
      </View>
    );
  }

  renderSchoolList() {
    const validSchoolSelected = this.state.selectedSchool.id !== "-1";
    const textBoxEmpty = this.state.selectedSchool.name === "";

    if(textBoxEmpty || validSchoolSelected) return [];

    return this.props.schools.map((school, index) =>
      <TouchableOpacity key={index} style={dropDownItemStyle} onPress={() => this.onSelectSchool(school)}>
        <Text style={schoolNameStyle}>{school.name}</Text>
        <Text style={schoolAddressStyle}>{school.address}</Text>
      </TouchableOpacity>
    );
  }
}
