import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNavigation, ActionButton } from 'react-native-material-ui';
import { styles, ICON_SIZE } from './styles';

export default class TabBarComponent extends Component {
  onHomePress = () => {
    this.props.navigation.navigate('home');
  }
  onMyBooksPress = () => {
    this.props.navigation.navigate('myBooks');
  }
  onNotificationsPress = () => {
    this.props.navigation.navigate('notifications');
  }
  onAccountPress = () => {
    this.props.navigation.navigate('account');
  }

  render() {
    const { Action } = BottomNavigation;

    return (
      <BottomNavigation active={true} hidden={false} >
        <Action
            key="home"
            icon={<Entypo name="home" size={ICON_SIZE} style={{color:"#fff"}} />}
            onPress={() => this.onHomePress()}
        />
        <Action
            key="myBooks"
            icon={<Entypo name="book" size={ICON_SIZE} style={{color:"#fff"}} />}
            onPress={() => this.onMyBooksPress()}
        />
        <ActionButton
          icon={<Entypo name="plus" size={ICON_SIZE} style={{color:"#fff"}} />}
        />
        <Action
            key="mail"
            icon={<Entypo name="mail" size={ICON_SIZE} style={{color:"#fff"}} />}
            onPress={() => this.onNotificationsPress()}
        />
        <Action
            key="account"
            icon={<MaterialCommunityIcons name="account" size={ICON_SIZE} style={{color:"#fff"}} />}
            onPress={() => this.onAccountPress()}
        />
    </BottomNavigation>
    );
  }
}
