import { StackNavigator, TabNavigator, } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import SchoolSelectionScreen from "../screens/SchoolSelectionScreenContainer";
import HomeScreen from "../screens/HomeScreenContainer";
import SingleBookScreen from "../screens/SingleBookScreenContainer/";
import MyBooksListingsScreen from "../screens/MyBooksListingsScreenContainer";
import MyBooksOrdersScreen from "../screens/MyBooksOrdersScreen";
import MyBooksBookmarksScreen from "../screens/MyBooksBookmarksScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccountScreen from "../screens/AccountScreenContainer";
import EnterBookDetailsScreen from "../screens/EnterBookDetailsScreenContainer";
import EnterBookDetailsCameraScreen from "../screens/EnterBookDetailsCameraScreenContainer";
import ScanBookScreen from "../screens/ScanBookScreenContainer";
import SubmissionSuccessScreen from "../screens/SubmissionSuccessScreen";
import PhoneScreen from "../screens/PhoneScreenContainer";
import PhonePinScreen from "../screens/PhonePinScreenContainer";
import PhonePasswordScreen from "../screens/PhonePasswordScreenContainer";
import ChangePasswordScreen from "../screens/ChangePasswordScreenContainer";
import ChangeFullNameScreen from "../screens/ChangeFullNameScreenContainer";
import TabBarComponent from "../modules/TabBarComponent";
import MyBooksTabBarComponent from "../modules/MyBooksTabBarComponent";
import RequireAuthenticationContainer from "../screens/RequireAuthenticationContainer/RequireAuthenticationContainer";
import BuyRequestScreen from "../screens/BuyRequestScreenContainer";

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
    screen: RequireAuthenticationContainer(EnterBookDetailsScreen, { resetToHomeOnClose: false, needsNavigationFocus: false }),
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

const myBooksNavigator = TabNavigator({
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
});

const SingleBookNavigator = StackNavigator({
  singleBookScreen: {
    screen: SingleBookScreen,
  },
  buyRequestScreen: {
    screen: BuyRequestScreen,
  }
}, {
  headerMode: "none",
});

const AccountNavigator = StackNavigator({
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

const HomeNavigator = TabNavigator({
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
    screen: ScanBookScreen
  }
}, {
  tabBarPosition: "bottom",
  tabBarComponent: TabBarComponent,
  lazy: true,
});

const AuthNavigator = StackNavigator({
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
  return StackNavigator({
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
  }, {
    initialRouteName: isFirstRun ? "welcomeScreen" : "mainScreen",
    headerMode: "none",
  });
}

export default createMainNavigator;
