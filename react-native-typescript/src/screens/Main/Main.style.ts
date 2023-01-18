import {C} from '../../assets/constants';
import {Platform, StyleSheet} from 'react-native';

export const mainStyles = StyleSheet.create({
  mainView: {
    padding: 10,
  },
  itemsCenter: {
    shadowRadius: 3,
    marginBottom: 5,
    paddingBottom: 10,
    shadowOpacity: 0.3,
    alignItems: 'center',
    borderBottomWidth: 1,
    shadowColor: C.colors.primary.color2,
    borderColor: C.colors.disabled.color2,
    elevation: Platform.OS === 'ios' ? 4 : 0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  txtStyle: {
    fontSize: 14,
    marginLeft: 10,
    color: C.colors.textColor.color1,
  },
  listStyle: {
    paddingBottom: 150,
  },
});
