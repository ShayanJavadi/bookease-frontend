import {
  StackNavigator,
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';

const MainNavigator = StackNavigator({

  welcome: { screen: WelcomeScreen },
},
{ headerMode: 'none', }
);

export default MainNavigator;
