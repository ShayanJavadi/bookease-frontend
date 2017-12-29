import { StyleSheet } from "react-native";
import uiTheme from "src/common/styles/uiTheme";

export const { palette } = uiTheme;

export const styles = StyleSheet.create({
  textInputStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionTextInputStyle: {
     marginTop: 20,
     paddingLeft: 20,
     paddingRight: 20,
     paddingBottom: 10,
     marginRight: 20,
     marginLeft: 20,
     borderRadius: 1,
     borderWidth: 0.5,
  },
});
