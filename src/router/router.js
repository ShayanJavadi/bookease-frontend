import {
  StackNavigator,
  TabNavigator,
} from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import SchoolSelectionScreen from "../screens/SchoolSelectionScreenContainer";
import AuthScreen from "../screens/AuthScreenContainer";
import HomeScreen from "../screens/HomeScreen";
import SingleBookScreen from "../screens/SingleBookScreen/";
import MyBooksListingsScreen from "../screens/MyBooksListingsScreen";
import MyBooksOrdersScreen from "../screens/MyBooksOrdersScreen";
import MyBooksBookmarksScreen from "../screens/MyBooksBookmarksScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccountScreen from "../screens/AccountScreen";
import EnterBookDetailsScreen from "../screens/EnterBookDetailsScreenContainer";
import EnterBookDetailsCameraScreen from "../screens/EnterBookDetailsCameraScreenContainer";
import ScanBookScreen from "../screens/ScanBookScreenContainer";
import EmailScreen from "../screens/EmailScreenContainer";
import EmailPinScreen from "../screens/EmailPinScreenContainer";
import EmailPasswordScreen from "../screens/EmailPasswordScreenContainer";
import PhoneScreen from "../screens/PhoneScreenContainer";
import PhonePinScreen from "../screens/PhonePinScreenContainer";
import PhonePasswordScreen from "../screens/PhonePasswordScreenContainer";
import ChangePasswordScreen from "../screens/ChangePasswordScreenContainer";
import ChangeFullNameScreen from "../screens/ChangeFullNameScreenContainer";

import TabBarComponent from "../modules/TabBarComponent";
import MyBooksTabBarComponent from "../modules/MyBooksTabBarComponent";

const SellBooksNavigator = StackNavigator({
  enterBookDetails: {
    screen: EnterBookDetailsScreen,
  },
  scanBook: {
    screen: ScanBookScreen,
  },
  newBookCamera: {
    screen: EnterBookDetailsCameraScreen,
  }
}, {
  headerMode: "none",
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

const SingleBookNavigator = StackNavigator({
  singleBookScreen: {
    screen: SingleBookScreen,
  },
}, {
  headerMode: "none",
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
  singleBook: {
    screen: SingleBookNavigator,
  }
});

const AuthNavigator = StackNavigator({
  auth: {
    screen: AuthScreen,
  },
  emailScreen: {
    screen: EmailScreen,
  },
  emailPinScreen: {
    screen: EmailPinScreen,
  },
  emailPasswordScreen: {
    screen: EmailPasswordScreen,
  },
  phoneScreen: {
    screen: PhoneScreen,
  },
  phonePinScreen: {
    screen: PhonePinScreen,
  },
  phonePasswordScreen: {
    screen: PhonePasswordScreen,
  },
  changeFullNameScreen: {
    screen: ChangeFullNameScreen,
  },
  changePasswordScreen: {
    screen: ChangePasswordScreen,
  },
  schoolSelectionScreen: {
    screen: SchoolSelectionScreen,
  },
  homeScreen: {
    screen: HomeNavigator,
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
