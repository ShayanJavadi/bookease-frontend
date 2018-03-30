import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { func, bool, node } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "./actions";

const mapStateToProps = ({ Session }) => ({
  currentStoredUser: Session.currentStoredUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
};

class SessionComponent extends Component {
  static propTypes = {
    getStoredSessionData: func.isRequired,
    isLoading: bool.isRequired,
    children: node,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.props.getStoredSessionData();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  render() {

    return (
      this.state.isLoading ?
      <View style={styles.container}><ActivityIndicator /></View> :
      <View style={styles.container}>{this.props.children}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionComponent);
