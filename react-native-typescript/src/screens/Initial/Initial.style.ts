import {StyleSheet} from 'react-native';
import {C} from '../../assets/constants';

export const initialStyles = StyleSheet.create({
  icon: {
    width: C.measures.width / 1.6,
    height: C.measures.width / 1.6,
  },
  btn: {
    height: 50,
    marginTop: 40,
    alignSelf: 'center',
    width: C.measures.width - 30,
    backgroundColor: C.colors.primary.color2,
  },
});
