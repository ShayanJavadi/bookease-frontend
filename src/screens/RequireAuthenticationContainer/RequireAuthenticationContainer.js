import React from "react";
import { AsyncStorage } from "react-native";
import { bool, func, shape, object } from "prop-types";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation"
import updateUser from "../SessionContainer/actions/updateUser";

export default function(ComposedComponent, options) {
  const { resetToHomeOnClose, needsNavigationFocus } = options;

  class RequireAuthenticationContainer extends ComposedComponent {
    static propTypes = {
      currentUser: object,
      isFocused: bool,
      navigation: shape({
        navigate: func.isRequired
      }).isRequired
    };

    checkAuthenticationStatus({ currentUser }) {
      const isAuthenticated = currentUser !== undefined;

      if (!isAuthenticated) {
        this.props.navigation.navigate("authScreen", {
          resetToHomeOnClose,
          isAuthenticationPopup: true,
        });
      }
    }

    async componentDidMount() {
      if (this.props.isFocused && this.props.navigation.state) {
        const isAuthenticated = this.props.currentUser !== undefined;

        if (!isAuthenticated) {
          const savedUser = JSON.parse(await AsyncStorage.getItem("currentUser"));

          if (savedUser) {
            this.props.updateUser(savedUser);
            return this.checkAuthenticationStatus({ currentUser: savedUser });
          }

          this.checkAuthenticationStatus(this.props);
        }
      }

    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.Session.currentUser,
    };
  }

  if (needsNavigationFocus) {
    return connect(mapStateToProps, { updateUser })(withNavigationFocus(RequireAuthenticationContainer));
  }
  return connect(mapStateToProps, { updateUser })(RequireAuthenticationContainer);
}
