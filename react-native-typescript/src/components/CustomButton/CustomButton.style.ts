import {StyleSheet} from 'react-native';
import {C} from '../../assets/constants';

export const customBtnStyle = StyleSheet.create({
  btn: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: C.measures.borderRadius,
  },
  txtStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: C.colors.primary.color1,
  },
  disabledBtn: {
    backgroundColor: C.colors.disabled.color1,
  },
  disabledTxt: {
    color: C.colors.disabled.color2,
  },
});
