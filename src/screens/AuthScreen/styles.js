import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const ICON_SIZE = 34;
export const LOGO_ICON_SIZE = 80;

export const styles = {
  screenStyle: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 190,
  },
  headerStyle: {
    fontSize: 20,
    marginBottom: 60,
    fontWeight: '100'
  },
  buttonStyle: {
    marginBottom: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonTextStyle: {
    fontWeight: '100',
    textAlign: 'left',
    fontSize: 15,
    paddingLeft: 30
  },
  buttonIconStyle: {
    color: '#fff',
  },
  facebookButtonStyle: {
    width: SCREEN_WIDTH * .68,
    backgroundColor: '#4267b2',
  },
  googleButtonStyle: {
    width: SCREEN_WIDTH * .68,
    backgroundColor: '#cf4332',
  },
  twitterButtonStyle: {
    width: SCREEN_WIDTH * .68,
    backgroundColor: '#1b95e0',
  },
  slideLogoStyle: {
    color:"#222",
  },
}
