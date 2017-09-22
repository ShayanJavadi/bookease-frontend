import {
  StackNavigator,
  TabNavigator,
} from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import SchoolSelectionScreen from "../screens/SchoolSelectionScreenContainer";
import AuthScreen from "../screens/AuthScreenContainer";
import HomeScreen from "../screens/HomeScreen";
import MyBooksListingsScreen from "../screens/MyBooksListingsScreen";
import MyBooksOrdersScreen from "../screens/MyBooksOrdersScreen";
import MyBooksBookmarksScreen from "../screens/MyBooksBookmarksScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccountScreen from "../screens/AccountScreen";
import EnterBookDetailsScreen from "../screens/EnterBookDetailsScreen";
import ScanBookScreen from "../screens/ScanBookScreenContainer";

import TabBarComponent from "../modules/TabBarComponent";
import MyBooksTabBarComponent from "../modules/MyBooksTabBarComponent";

const SellBooksNavigator = TabNavigator({
  enterBookDetails: {
    screen: EnterBookDetailsScreen,
  },
  scanBook: {
    screen: ScanBookScreen,
  },
});

const myBooksNavigator = TabNavigator({
  myBooksListings: {
    screen: MyBooksListingsScreen,
  },
  myBooksOrders: {
    screen: MyBooksOrdersScreen,
  },
  myBooksBookmarks: {
    screen: MyBooksBookmarksScreen,
  },
}, {
  tabBarPosition: "top",
  tabBarComponent: MyBooksTabBarComponent,
});

const HomeNavigator = TabNavigator({
  home: {
    screen: HomeScreen,
  },
  myBooks: {
    screen: myBooksNavigator,
  },
  notifications: {
    screen: NotificationScreen,
  },
  account: {
    screen: AccountScreen,
  },
}, {
  tabBarPosition: "bottom",
  tabBarComponent: TabBarComponent,
});

const MainNavigator = StackNavigator({
  mainScreen: {
    screen: HomeNavigator,
  },
  sellBooks: {
    screen: SellBooksNavigator,
  },

}, {
  mode: "modal",
});

const SchoolSelectionNavigator = StackNavigator({
  schoolSelection: {
    screen: SchoolSelectionScreen,
  },
  homeScreen: {
    screen: HomeNavigator,
  },
}, {
  headerMode: "none",
});

const AuthNavigator = StackNavigator({
  auth: {
    screen: AuthScreen,
  },
  schoolSelectionScreen: {
    screen: SchoolSelectionNavigator,
  },
}, {
  headerMode: "none",
});

const WelcomeNavigator = StackNavigator({ // eslint-disable-line
  welcome: {
    screen: WelcomeScreen,
  },
  authScreen: {
    screen: AuthNavigator,
  },
}, {
  headerMode: "none",
});

// temporary changed to HomeNavigator for debugging
// original value: MainNavigator
export default MainNavigator;
