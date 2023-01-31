import {StyleSheet} from 'react-native';
import {C} from '../../assets/constants';

export const homeStyles = StyleSheet.create({
  parentView: {
    padding: 20,
  },
  circleStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-start',
    backgroundColor: C.colors.primary.color2,
  },
  sqreStyle: {
    margin: 30,
    backgroundColor: 'black',
  },
  btn: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: C.measures.width - 50,
    backgroundColor: C.colors.primary.color2,
  },
  txtStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
});
