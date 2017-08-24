import {
  StackNavigator,
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SchoolSelectionScreen from '../screens/SchoolSelectionScreen';
import AuthScreen from '../screens/AuthScreenContainer';
import HomeScreen from '../screens/HomeScreen';

const SchoolSelectionNavigator = StackNavigator({
  schoolSelection: {
    screen: SchoolSelectionScreen
  },
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

export default MainNavigator;
