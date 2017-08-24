import {
  StackNavigator,
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SchoolSelectionScreen from '../screens/SchoolSelectionScreen';
import AuthScreen from '../screens/AuthScreen';

const MainNavigator = StackNavigator({
    welcome: { screen: WelcomeScreen },
    schoolSelection: { screen: SchoolSelectionScreen },
    authScreen: { screen: AuthScreen },
  },
  { headerMode: 'none' }
);

export default MainNavigator;
