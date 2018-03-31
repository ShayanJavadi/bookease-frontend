import React from "react";
import { bool, func, shape, object } from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { withNavigationFocus } from "react-navigation"
import actions from "../SessionContainer/actions";

export default function(ComposedComponent, options) {
  const { resetToHomeOnClose, needsNavigationFocus } = options;

  class RequireAuthenticationContainer extends ComposedComponent {
    static propTypes = {
      currentStoredUser: object,
      isFocused: bool,
      navigation: shape({
        navigate: func.isRequired
      }).isRequired
    };

    checkAuthenticationStatus() {
      const isAuthenticated = !isEmpty(this.props.currentStoredUser);

      if (!isAuthenticated) {
        this.props.navigation.navigate("authScreen", {
          resetToHomeOnClose,
          isAuthenticationPopup: true,
        });
      }
    }

    async componentDidMount() {
      if (this.props.isFocused && this.props.navigation.state) {
        this.checkAuthenticationStatus();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      currentStoredUser: state.Session.currentStoredUser,
    };
  }

  if (needsNavigationFocus) {
    return connect(mapStateToProps, { ...actions })(withNavigationFocus(RequireAuthenticationContainer));
  }
  return connect(mapStateToProps, { ...actions })(RequireAuthenticationContainer);
}
