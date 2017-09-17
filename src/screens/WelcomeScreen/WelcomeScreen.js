import React, { Component } from "react";
import { func, shape } from "prop-types";
import Slides from "../../modules/SlidesComponent/Slides";
import { SLIDE_DATA } from "./consts";

export default class WelcomeScreen extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  onSlidesComplete = () => {
    this.props.navigation.navigate("authScreen");
  };

  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}
