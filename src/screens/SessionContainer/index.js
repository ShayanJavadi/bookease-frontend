import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { func, bool, node } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "./actions";
import getSessionQuery from "./graphql/getSessionQuery";

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
    getSessionQuery: func.isRequired,
    setStoredUser: func.isRequired,
  }

  state = {
    isLoading: true,
  }
  
  componentDidMount() {
    this.props.getSessionQuery.refetch()
    .then(query => {
      const user = query.data.getSession.user;
      const { schoolId } = user;
      this.props.setStoredUser({ 
        schoolId,
        fullName: user.displayName,
        schoolName: user.school.name 
      })
      .then(() => {
        this.props.getStoredSessionData()
      })
    })   
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

const Container = compose(
  graphql(getSessionQuery, {
    name: "getSessionQuery",
  }),
)

export default Container(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionComponent));
