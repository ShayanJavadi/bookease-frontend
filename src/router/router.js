import {
  StackNavigator,
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SchoolSelectionScreen from '../screens/SchoolSelectionScreen';

const MainNavigator = StackNavigator({
    welcome: { screen: WelcomeScreen },
    schoolSelection: { screen: SchoolSelectionScreen },
  },
  { headerMode: 'none' }
);

export default MainNavigator;
