import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo';
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-material-ui";
import BackButton from "src/modules/BackButton";
import { styles } from "./styles";

const {
  screenStyle,
  headerStyle,
  headerTitleStyle,
} = styles;

export default class EnterBookDetailsCameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: "Take photos copy goes here",
    headerLeft: <BackButton navigation={navigation}/>,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitleStyle: { color: "#fff" }
  })

  render() {
    return (
      <View style={screenStyle}>
        <Camera
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 0.9,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
          <TouchableOpacity
          >
            <MaterialIcons name="flash-on" size={25} style={{ color: "#fff" }}/>
          </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: "center",

            }}
          >
          <View style={{ justifyContent: "flex-start"}}>
            <TouchableOpacity
            >
              <MaterialIcons name="flash-on" size={25} style={{ color: "#fff" }}/>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center"}}>
            <View style={{ borderWidth: 1, borderColor: "#fff", height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity
                  style={{ backgroundColor: "#fff", height: 44, width: 44, borderRadius: 22}}
                >
                </TouchableOpacity>
            </View>

          </View>

          </View>
        </Camera>
      </View>
    );
  }
}
