import React, { Component } from 'react';
import { Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-material-ui';
import { Autocomplete } from 'react-native-autocomplete-input';
import { styles } from './styles';

const { screenStyle, headerStyle, inputStyle, buttonStyle, buttonTextStyle } = styles;

export default class SchoolSelectionScreen extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    this.props.searchForSchool();
  }

  onComplete() {
    this.props.navigation.navigate('authScreen');
  }

  render() {
    return (
      <View style={screenStyle}>
        <View>
          <Text style={headerStyle}>Select Your School</Text>
        </View>
        <View>

        </View>
        <View>
          <Button
            raised
            primary
            style={{container: buttonStyle, text: buttonTextStyle}}
            text="Select"
            onPress={() => this.onComplete()}
          />
        </View>
      </View>
    );
  }
}
