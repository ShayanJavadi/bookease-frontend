import {StackNavigator, TabNavigator,} from "react-navigation";
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
import SubmissionSuccessScreen from "../screens/SubmissionSuccessScreen";
import EmailScreen from "../screens/EmailScreenContainer";
import EmailPinScreen from "../screens/EmailPinScreenContainer";
import PhoneScreen from "../screens/PhoneScreenContainer";
import PhonePinScreen from "../screens/PhonePinScreenContainer";
import RequireAuthenticationContainer from "../screens/RequireAuthenticationContainer/RequireAuthenticationContainer";
import TabBarComponent from "../modules/TabBarComponent";
import MyBooksTabBarComponent from "../modules/MyBooksTabBarComponent";

const SubmissionSuccessNavigator = StackNavigator({
  successScreen: {
    screen: SubmissionSuccessScreen,
  },
}, {
  headerMode: "none",
  mode: "modal",
});

const SellBooksNavigator = StackNavigator({
  enterBookDetails: {
    screen: RequireAuthenticationContainer(EnterBookDetailsScreen),
  },
  scanBook: {
    screen: RequireAuthenticationContainer(ScanBookScreen),
  },
  newBookCamera: {
    screen: EnterBookDetailsCameraScreen,
  },
  submissionSuccessScreen: {
    screen: SubmissionSuccessNavigator,
  }
}, {
  headerMode: "none",
  mode: "modal",

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

const SchoolSelectionNavigator = StackNavigator({
  schoolSelection: {
    screen: SchoolSelectionScreen,
  }
}, {
  headerMode: "none",
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
  phoneScreen: {
    screen: PhoneScreen,
  },
  phonePinScreen: {
    screen: PhonePinScreen,
  },
  schoolSelectionScreen: {
    screen: SchoolSelectionNavigator,
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
  },
  auth: {
    screen: AuthNavigator
  }
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

export default MainNavigator;
