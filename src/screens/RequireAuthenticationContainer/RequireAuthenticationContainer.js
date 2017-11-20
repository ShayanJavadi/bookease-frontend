import React, { Component } from "react";
import { bool, func, shape } from "prop-types";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class RequireAuthenticationContainer extends Component {
    static propTypes = {
      isAuthenticated: bool.isRequired,
      navigation: shape({
        navigate: func.isRequired
      }).isRequired
    };

    checkAuthenticationStatus({ isAuthenticated }) {
      if (!isAuthenticated) {
        this.props.navigation.navigate("auth");
      }
    }

    componentWillMount() {
      this.checkAuthenticationStatus(this.props);
    }

    componentWillUpdate(nextProps) {
      this.checkAuthenticationStatus(nextProps);
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.Session.isAuthenticated
    };
  }

  return connect(mapStateToProps)(RequireAuthenticationContainer);
}
