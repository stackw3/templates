import {C} from '../../assets/constants';
import {Platform, StyleSheet} from 'react-native';

export const profileCardStyles = StyleSheet.create({
  cardView: {
    width: '100%',
    borderWidth: 1,
    shadowRadius: 3,
    marginBottom: 10,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: C.colors.primary.color2,
    borderColor: C.colors.disabled.color2,
    borderRadius: C.measures.borderRadius,
    elevation: Platform.OS === 'ios' ? 4 : 0,
    height: Platform.OS === 'ios' ? 100 : 90,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '600',
    color: C.colors.textColor.color1,
  },
  imageStyle: {
    borderRadius: 90,
    width: Platform.OS === 'ios' ? 80 : 70,
    height: Platform.OS === 'ios' ? 80 : 70,
  },
  viewStyle: {
    height: '50%',
    justifyContent: 'space-evenly',
  },
});
