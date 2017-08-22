import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const ICON_SIZE = 50;

export const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideTextStyle: {
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 70
  },
  buttonStyle: {
    backgroundColor: '#A100FF',
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: '700'
  },
  slideLogoStyle: {
    color:"#fff",
    paddingBottom: 60
  },
  slideDotsStyle: {
    color:"#fff",
  }
}
