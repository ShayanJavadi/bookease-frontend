import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation } from 'react-native-material-ui';
import { styles, ICON_SIZE, PLUS_ICON_SIZE } from './styles';
import ActionButton from 'react-native-action-button';
const {
  sellBooksButtonStyle,
  sellBooksButtonIconStyle
 } = styles;

export default class TabBarComponent extends Component {
  onHomePress = () => {
    this.props.navigation.navigate('home');
  }

  onMyBooksPress = () => {
    this.props.navigation.navigate('myBooks');
  }

  onSellBooksPress = () => {
    this.props.navigation.navigate('sellBooks');
  }

  onNotificationsPress = () => {
    this.props.navigation.navigate('notifications');
  }

  onAccountPress = () => {
    this.props.navigation.navigate('account');
  }

  render() {
    const { Action } = BottomNavigation;
    const { Item } = ActionButton;

    return (
      <View>
        <BottomNavigation hidden={false}>
          <Action
              key="home"
              icon={<Entypo name="home" size={ICON_SIZE} style={{color:"#fff"}} />}
              onPress={() => this.onHomePress()}
          />
          <Action
              key="myBooks"
              icon={<Entypo name="book" size={ICON_SIZE} style={{ color:"#fff" }} />}
              onPress={() => this.onMyBooksPress()}
          />
          <Action
              key="mail"
              icon={<Entypo name="mail" size={ICON_SIZE} style={{ color:"#fff" }} />}
              onPress={() => this.onNotificationsPress()}
          />
          <Action
              key="account"
              icon={<MaterialCommunityIcons name="account" size={ICON_SIZE} style={{color:"#fff"}} />}
              onPress={() => this.onAccountPress()}
          />
        </BottomNavigation>
        <View style={sellBooksButtonStyle}>
          <ActionButton
            buttonColor="#EB2A5D"
            onPress={() => { console.log("hi")}}
            position="right"
          >
            <Item
              buttonColor='#ff9900'
              title="Manually Enter Info"
              style={{ height: 2}}
            >
              <MaterialCommunityIcons name="edit" size={23} style={{ color: "#fff" }}/>
            </Item>
            <Item
              buttonColor='#A100FF'
              title="Scan Book"
            >
              <MaterialCommunityIcons name="barcode-scan" size={23} style={{ color: "#fff"}}/>
            </Item>
          </ActionButton>
        </View>
      </View>
    );
  }
}
