import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slides from '../../modules/SlidesComponent/Slides';
import { SLIDE_DATA } from './consts';

export default class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('schoolSelection');
  }

  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}
