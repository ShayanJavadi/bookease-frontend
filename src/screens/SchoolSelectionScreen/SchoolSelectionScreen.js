import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-material-ui";
import Autocomplete from "react-native-autocomplete-input";
import { styles } from "./styles";

const { screenStyle, headerAutocompleteContainerStyle, headerStyle, inputStyle, schoolNameStyle, schoolAddressStyle, buttonStyle, buttonTextStyle, noButtonPaddingStyle } = styles;

export default class SchoolSelectionScreen extends Component {
  componentWillMount() {
    this.setState({ selectedSchool: { name: "", address: "", id: -1 } });
  }

  onComplete() {
    this.props.navigation.navigate("home");
  }

  render() {
    return (
      <View style={screenStyle}>
        <View style={headerAutocompleteContainerStyle}>
          <Text style={headerStyle}>Select Your School</Text>
          <Autocomplete
            style={inputStyle}
            autoCorrect={false}
            keyboardShouldPersistTaps="never"
            placeholder="Type here"
            data={this.state.selectedSchool.id !== -1 ? [] : this.props.schools}
            defaultValue={this.state.selectedSchool.name}
            onChangeText={(text) => {
              this.setState({ selectedSchool: {
                name: text,
                address: "",
                id: -1,
              } });
              this.props.searchForSchool(text);
            }
            }
            renderItem={school =>
              (<TouchableOpacity onPress={() => this.setState({ selectedSchool: school })}>
                <Text style={schoolNameStyle}>{school.name}</Text>
                <Text style={schoolAddressStyle}>{school.address}</Text>
              </TouchableOpacity>)
            }
            renderSeparator={() =>
              (<View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />)
            }
          />
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
}
