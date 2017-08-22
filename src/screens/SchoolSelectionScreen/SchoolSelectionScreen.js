import React, { Component } from 'react';
import { Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-material-ui';
import { styles } from './styles';

const { screenStyle, headerStyle, inputStyle, buttonStyle, buttonTextStyle } = styles;

export default class SchoolSelectionScreen extends Component {
  render() {
    return (
      <View style={screenStyle}>
        <View>
          <Text style={headerStyle} >Select Your School</Text>
        </View>
        <View>
          <TextInput
            style={inputStyle}
          />
        </View>
        <View>
          <Button
            raised
            primary
            style={{container: buttonStyle, text: buttonTextStyle}}
            text="Select"
            onPress={this.props.onComplete}
          />
        </View>
      </View>
    );
  }
}
