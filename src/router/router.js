import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SchoolSelectionScreen from '../screens/SchoolSelectionScreen';
import AuthScreen from '../screens/AuthScreenContainer';

import HomeScreen from '../screens/HomeScreen';
import MyBooksScreen from '../screens/MyBooksScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AccountScreen from '../screens/AccountScreen';
import TabBarComponent from '../modules/TabBarComponent';


const HomeNavigator = TabNavigator({
  home: {
    screen: HomeScreen
  },
  myBooks: {
    screen: MyBooksScreen
  },
  notifications: {
    screen: NotificationScreen
  },
  account: {
    screen: AccountScreen
  }
}, {
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarComponent
});

const SchoolSelectionNavigator = StackNavigator({
  schoolSelection: {
    screen: SchoolSelectionScreen
  },
  homeScreen: {
    screen: HomeNavigator
  }
}, {
  headerMode: 'none',
});

const AuthNavigator = StackNavigator({
  auth: {
    screen: AuthScreen
  },
  schoolSelectionScreen: {
    screen: SchoolSelectionNavigator
  }
}, {
  headerMode: 'none',
});

const MainNavigator = StackNavigator({
  welcome: {
    screen: WelcomeScreen
  },
  authScreen: {
    screen: AuthNavigator
  },
}, {
   headerMode: 'none'
});

// temporary changed to HomeNavigator for debugging
// original value: MainNavigator
export default HomeNavigator;
