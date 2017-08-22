import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = {
  screenStyle: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 60,
    paddingRight: 60
  },
  headerStyle: {
    fontSize: 29,
    fontWeight: '100'
  },
  inputStyle: {
    height: 40,
    width: SCREEN_WIDTH * .7,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonStyle: {
    width: SCREEN_WIDTH * .7,
    backgroundColor: '#222'
  },
  buttonTextStyle: {
    fontWeight: '700'
  },
}
