import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import SchoolSelectionScreen from "../SchoolSelectionScreen";

const mapStateToProps = ({ schoolSelectionReducer }) => ({
  schools: schoolSelectionReducer.schools,
});

export default connect(mapStateToProps, actions)(SchoolSelectionScreen);
