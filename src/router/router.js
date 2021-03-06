import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import SchoolSelectionScreen from "../screens/SchoolSelectionScreenContainer";
import HomeScreen from "../screens/HomeScreenContainer";
import SingleBookScreen from "../screens/SingleBookScreenContainer/";
import MyBooksListingsScreen from "../screens/MyBooksListingsScreenContainer";
import MyBooksOrdersScreen from "../screens/MyBooksOrdersScreenContainer";
import MyBooksBookmarksScreen from "../screens/MyBooksBookmarksScreenContainer";
import NotificationScreen from "../screens/NotificationScreenContainer";
import AccountScreen from "../screens/AccountScreenContainer";
import EnterBookDetailsScreen from "../screens/EnterBookDetailsScreenContainer";
import EnterBookDetailsCameraScreen from "../screens/EnterBookDetailsCameraScreenContainer";
import ScanBookScreen from "../screens/ScanBookScreenContainer";
import SubmissionSuccessScreen from "../screens/SubmissionSuccessScreen";
import PhoneScreen from "../screens/PhoneScreenContainer";
import PhonePinScreen from "../screens/PhonePinScreenContainer";
import PhonePasswordScreen from "../screens/EnterPasswordScreenContainer";
import ChangePasswordScreen from "../screens/ChangePasswordScreenContainer";
import ChangeFullNameScreen from "../screens/ChangeFullNameScreenContainer";
import TabBarComponent from "../modules/TabBarContainer";
import MyBooksTabBarComponent from "../modules/MyBooksTabBarComponent";
import RequireAuthenticationContainer from "../screens/RequireAuthenticationContainer/RequireAuthenticationContainer";
import BuyRequestScreen from "../screens/BuyRequestScreenContainer";
import SingleNotificationScreen from "../screens/SingleNotificationScreenContainer";

const SubmissionSuccessNavigator = createStackNavigator({
  successScreen: {
    screen: SubmissionSuccessScreen,
  },
}, {
  headerMode: "none",
  mode: "modal",
});

const SellBooksNavigator = createStackNavigator({
  enterBookDetails: {
    screen: RequireAuthenticationContainer(EnterBookDetailsScreen, { resetToHomeOnClose: false, needsNavigationFocus: true }),
  },
  scanBook: {
    screen: ScanBookScreen,
  },
  newBookCamera: {
    screen: EnterBookDetailsCameraScreen,
  },
  submissionSuccessScreen: {
    screen: SubmissionSuccessNavigator,
  }
}, {
  mode: "modal",
});

const myBooksNavigator = createMaterialTopTabNavigator({
  myBooksListings: {
    screen: RequireAuthenticationContainer(MyBooksListingsScreen, { resetToHomeOnClose: true, needsNavigationFocus: true }),
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
  swipeEnabled: "false",
});

const SingleBookNavigator = createStackNavigator({
  singleBookScreen: {
    screen: SingleBookScreen,
  },
  buyRequestScreen: {
    screen: BuyRequestScreen,
  }
}, {
  headerMode: "none",
});

const AccountNavigator = createStackNavigator({
  account: {
    screen: RequireAuthenticationContainer(AccountScreen, { resetToHomeOnClose: true, needsNavigationFocus: true }),
  },
  changeFullNameScreen: {
    screen: ChangeFullNameScreen,
  },
  changePasswordScreen: {
    screen: ChangePasswordScreen,
  },
  changeSchoolScreen: {
    screen: SchoolSelectionScreen,
  },
}, {
  headerMode: "none",
});

const HomeNavigator = createBottomTabNavigator({
  home: {
    screen: HomeScreen,
  },
  myBooks: {
    screen: myBooksNavigator,
  },
  notifications: {
    screen: RequireAuthenticationContainer(NotificationScreen, { resetToHomeOnClose: true, needsNavigationFocus: true }),
  },
  account: {
    screen: AccountNavigator,
  },
  scan: {
    screen: ScanBookScreen,
  },
}, {
  tabBarPosition: "bottom",
  tabBarComponent: TabBarComponent,
  swipeEnabled: false,
  animationEnabled: false
});

const AuthNavigator = createStackNavigator({
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

const createMainNavigator = (isFirstRun = false) => {
  return createStackNavigator({
    welcomeScreen: {
      screen: WelcomeScreen,
    },
    mainScreen: {
      screen: HomeNavigator,
    },
    sellBooks: {
      screen: SellBooksNavigator,
    },
    singleBook: {
      screen: SingleBookNavigator,
    },
    authScreen: {
      screen: AuthNavigator,
    },
    singleNotificationScreen: {
      screen: SingleNotificationScreen,
    }
  }, {
    initialRouteName: isFirstRun ? "welcomeScreen" : "mainScreen",
    headerMode: "none",
  });
}

export default createMainNavigator;
