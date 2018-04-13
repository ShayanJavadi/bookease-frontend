import React from "react";
import { Text, View } from "react-native";
import { node, string, object, bool, array, func } from "prop-types";
import RNModal from "react-native-modal";
import { Dialog, DialogDefaultActions } from "react-native-material-ui";

import { styles } from "./styles";

const {
  modalWrapperStyle,
  modalContentStyle,
} = styles;

const renderModalContent = (children) => {
  const { Content } = Dialog;

  if (children) {
    return (
      <Content>
        <View style={modalContentStyle}>
          {children}
        </View>
      </Content>
    )
  }
}

const Modal = ({ isVisible, text, textStyle, actions, onActionPress, children, options, containerStyle }) => {
  const { Title, Actions } = Dialog;

  return (
    <RNModal isVisible={isVisible} style={containerStyle || modalWrapperStyle}>
      <Dialog>
        <Title>
          <Text style={textStyle}>{text}</Text>
        </Title>
        {renderModalContent(children)}
        <Actions>
          <DialogDefaultActions
            actions={actions}
            options={options}
            onActionPress={onActionPress}
          />
        </Actions>
      </Dialog>
    </RNModal>

  )
}

Modal.propTypes = {
  isVisible: bool.isRequired,
  text: string,
  textStyle: object,
  actions: array,
  onActionPress: func,
  children: node,
  options: object,
}

export default Modal;
