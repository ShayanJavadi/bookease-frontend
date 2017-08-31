import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = {
  searchBarWrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputWrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 9999,
  },
  inputStyle: {
      flex: 1,
      paddingTop: 1,
      paddingRight: 2,
      paddingLeft: 8,
      width: 90,
      height: 40,
      fontSize: 14,
      backgroundColor: '#fff',
      color: '#424242',
      borderRightWidth: .5,
      borderRightColor: "rgba(0,0,0,0.3)",
      marginRight: 8
  },
  searchIconStyle: {
    color: '#444',
    marginTop: 10,
    marginLeft: 7
  },
  barCodeIconStyle: {
    color: '#444',
    marginTop: 5,
    marginRight: 8
  }
}
