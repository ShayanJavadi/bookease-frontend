import React from "react";
import { bool, func, shape } from "prop-types";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation-is-focused-hoc"

export default function(ComposedComponent, options) {
  const { resetToHomeOnClose, isNavigator } = options;

  class RequireAuthenticationContainer extends ComposedComponent {
    static propTypes = {
      isAuthenticated: bool.isRequired,
      isFocused: bool.isRequired,
      navigation: shape({
        navigate: func.isRequired
      }).isRequired
    };

    checkAuthenticationStatus({ isAuthenticated }) {
      if (!isAuthenticated) {
        this.props.navigation.navigate("authScreen", { resetToHomeOnClose: resetToHomeOnClose });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.isFocused && nextProps.isFocused) {
        this.checkAuthenticationStatus(nextProps);
      }
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

  if (isNavigator) {
    return RequireAuthenticationContainer;
  }

  return connect(mapStateToProps)(withNavigationFocus(RequireAuthenticationContainer));
}
